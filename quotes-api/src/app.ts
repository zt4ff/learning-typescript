/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import dotenv from 'dotenv';
import { quotesRouter } from './routes/quotes';
import { userRouter } from './routes/user';
import { handleQuotesError, handle404, authenticationMiddleware } from './middleware/index';

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
      console.log('Database connected successfully');
    } else {
      throw new Error('provided a connection url in the environment');
    }
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(expressSession());

  app.use(helmet());
  app.use(logger('dev'));
  app.use(bodyParser({ extended: false }));

  app.use('/api', userRouter);
  app.use('/api', authenticationMiddleware);
  app.use('/api', quotesRouter);

  // error handler
  app.use(handleQuotesError);
  app.use(handle404);

  return app;
};

export default App;
