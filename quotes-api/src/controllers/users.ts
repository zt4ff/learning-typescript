/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../model/user';
import { sendEmail } from '../controllers/email';
import { isEmpty, isValidEmailAddress } from '../helpers';

dotenv.config();

const validateUserCredential = (username:string, email: string, password: string) => {
  // is null or undefined
  if (!username || !password || !email) {
    throw new Error('Input password, username and email please');
  }
  // is empty
  if (isEmpty(username) || isEmpty(password) || isEmpty(email)) {
    throw new Error('email, username or password should not be empty');
  }
  // invalid email
  if (!isValidEmailAddress(email)) {
    throw new Error('input a valid email address');
  }
};

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'username already exists' });
    }
    const newUser = new User({ username, password, email });
    await newUser.save();

    const userCreationSuccessEmailText = `Hi ${username}
Your account was created successfully. Thanks

John Hopkin,
CEO, Quote API
`;

    await sendEmail(email, userCreationSuccessEmailText, 'Account Created');
    res.status(200).json({ message: 'account created successfully' });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Input password and email please' });
    }
    const user:UserModel = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'incorrect username and password' });
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) return res.status(400).json({ error: 'incorrect email and password' });

    if (!process.env.JWT_SECRET) {
      process.exit(1);
    }
    const tokenSecret: string = process.env.JWT_SECRET!;
    // generate a token and save to database and session
    jwt.sign({
      username,
    }, tokenSecret, {}, (err, token) => {
      if (err) return next(err);
      req.session.token = token!;
      res.status(200).json({ message: 'login successfully' });
    });
  } catch (err) {
    next(err);
  }
};
