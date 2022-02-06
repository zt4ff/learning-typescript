import express from 'express';
import { signupUser, loginUser } from '../controllers/users';

const Router = express.Router();

Router.post('/signup', signupUser);

Router.post('/login', loginUser);

export const userRouter = Router;
