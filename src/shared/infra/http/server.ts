import 'reflect-metadata'; // Use decorator syntax
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '../../errors/AppError';

import routes from './routes';

// Injection dependencies
import '@shared/container';
// Conection with DB
import '@shared/infra/typeorm';

const app = express();

app.use(express.json());

app.use(routes);

// Middleware for generating errors
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Servidor rodando na porta: 3333');
});
