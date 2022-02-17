/* eslint-disable import/no-extraneous-dependencies */
import {
  NextFunction, Request, Response,
} from 'express';
import jwt from 'jsonwebtoken';

/**
 * Checks is user is authenticated and adding {authUser} if user exist
 * @example
 * app.post("/route", authenticationMiddleware, (req, res) => {
 *  // the app would run then req.authUser is availble
 * res.send(req.authUser)
 * })
 */
export const authenticationMiddleware = (req:Request, res:Response, next:NextFunction) => {
  try {
    if (!req.session.token) return res.status(400).json({ error: 'no authorization' });
    const { token } = req.session;
    if (!process.env.JWT_SECRET) {
      process.exit(1);
    }
    const tokenSecret: string = process.env.JWT_SECRET!;
    jwt.verify(token, tokenSecret, (err, decoded) => {
      if (err) return next(err);
      req.authUser = decoded!;
      next();
    });
  } catch (err) {
    next(err);
  }
};

/**
 * middleware to handle all error from the database
 */
export const handleNamedError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === 'QuotesRoutesError') {
    return res.status(500).json({ error: err.message });
  } if (err.name === 'AuthError') {
    return res.status(500).json({ error: err.message });
  }
  next(err);
};

/**
 * 404 handler middleware
 */
export const handle404 = (req: Request, res: Response) => {
  res.status(404).json({ error: '404 - Are you lost!' });
};
