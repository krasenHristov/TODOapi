import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'A simple Express API for managing tasks',
    },

    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },

  apis: ['./src/**/*.ts'],
};

const specs = swaggerJsdoc(options);

export default (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
