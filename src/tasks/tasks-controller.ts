import { Request, Response } from 'express';
import { AppDataSource } from '../..';
import { Task } from './tasks-entity';
import { instanceToPlain } from 'class-transformer';
import { validationResult } from 'express-validator';

class TaskController {

  // @ts-ignore
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {

      // get all tasks from the database await this.taskRepository.find();
      let allTasks: Task[] = await AppDataSource.getRepository(Task).find({
        order: {
          date: 'ASC',
        },
      });
      // convert the tasks to plain objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);

    } catch (error) {
      return res.json({ error : 'internal server error' }).status(500);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
 
  // check if there are any validation errors
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {

    // return the validation errors
    return res.status(400).json({ errors: errors.array() });
 
    }

  // create a new task instance
  const newTask: Task = new Task();

  // set the task's properties
  newTask.title = req.body.title;
  newTask.date = req.body.date;
  newTask.description = req.body.description;
  newTask.status = req.body.status;
  newTask.priority = req.body.priority;

  // save the task to the database
  try {
    let savedTask: Task = await AppDataSource.getRepository(Task).save(newTask);

    // convert the task to a plain object
    savedTask = instanceToPlain(savedTask) as Task;

    // return the newly created task
    return res.json(savedTask).status(201);
  } catch (error) {
    return res.json({ error : 'internal server error' }).status(500);
    }
  }
}
export const taskController = new TaskController();

