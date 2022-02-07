/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../model/user';
import { sendEmail } from '../controllers/email';
import { isEmpty, isValidEmailAddress } from '../helpers';
import { messages } from '../helpers/messages';
import { ERRORS } from '../helpers/errors';

dotenv.config();

const validateUserCredential = (username:string, email: string, password: string) => {
  // is null or undefined
  if (!username || !password || !email) {
    throw new Error(messages.ALL_CREDENTIAL_ERROR);
  }
  // is empty
  if (isEmpty(username) || isEmpty(password) || isEmpty(email)) {
    throw new Error(messages.CREDENTIAL_IS_EMPTY_ERROR);
  }
  // invalid email
  if (!isValidEmailAddress(email)) {
    throw new Error(messages.VALID_EMAIL_ERROR);
  }
};

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body;

    validateUserCredential(username, email, password);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: messages.USERNAME_EXISTS_ERROR });
    }
    const newUser = new User({ username, password, email });
    await newUser.save();

    const userCreationSuccessEmailText = messages.userCreationEmail(username);

    await sendEmail(email, userCreationSuccessEmailText, 'Account Created');
    res.status(200).json({ message: messages.ACCOUNT_CREATION_SUCCESS });
  } catch (err) {
    next(new ERRORS.AuthError(err.message));
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: messages.LOGIN_CREDIENTIAL_ERROR });
    }
    const user:UserModel = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: messages.INCORRECT_LOGIN_CREDIENTIAL });
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) return res.status(400).json({ error: messages.INCORRECT_LOGIN_CREDIENTIAL });

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
      res.status(200).json({ message: messages.LOGIN_SUCCESS });
    });
  } catch (err) {
    next(new ERRORS.AuthError(err.message));
  }
};
