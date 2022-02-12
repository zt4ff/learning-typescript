/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import cluster from 'cluster';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import { quotesRouter } from './routes/quotes';
import { userRouter } from './routes/user';
import { handleNamedError, handle404, authenticationMiddleware } from './middleware/index';

interface A {
  (): Promise<express.Application>
  closeConnection?: typeof mongoose
}

const App: A = async () => {
  dotenv.config();

  const app: express.Application = express();
  try {
    if (process.env.PRODUCTION_DATABASE) {
      const closeConnection = await mongoose.connect(process.env.PRODUCTION_DATABASE);
      App.closeConnection = closeConnection;
      if (cluster.isWorker) {
        console.log(`database at worker ${cluster.worker!.id} connected`);
      } else console.log('Database connected successfully');
    } else {
      throw new Error('provided a connection url in the environment');
    }
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }

  // test the cluster response
  app.use((req, res, next) => {
    if (cluster.isWorker) console.log(`Requested handled by ${cluster.worker!.id}`);
    next();
  });

  app.use(cookieParser(process.env.COOKIE_SECRET!));
  app.use(expressSession({
    secret: process.env.COOKIE_SECRET!,
    resave: false,
    saveUninitialized: true,
  }));

  app.use(helmet());
  app.use(logger('dev'));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/api', userRouter);
  app.use('/api', authenticationMiddleware);
  app.use('/api', quotesRouter);

  app.get('/test', (req, res) => {
    const transaction = Sentry.startTransaction({
      op: 'test',
      name: 'My First Test Transaction',
    });

    setTimeout(() => {
      try {
        foo();
      } catch (e) {
        Sentry.captureException(e);
      } finally {
        transaction.finish();
        res.send('welcome');
      }
    }, 99);
  });

  // error handler
  app.use(handleNamedError);
  app.use(handle404);

  return app;
};

export default App;
