import { NextFunction, Request, Response } from 'express';
import { Quote } from '../model/quote';
import { ERRORS } from '../helpers/errors';
import { messages } from '../helpers/messages';

export const getAllQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Quote.find({});
    return res.status(200).json(notes);
  } catch (err: any) {
    next(new ERRORS.QuotesRoutesError(err.message));
  }
};

export const getSingleQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quote = await Quote.findById(req.params.id);
    res.status(200).json(quote);
  } catch (err: any) {
    res.locals.error = new ERRORS.QuotesRoutesError(err.message);
    next(err);
  }
};

export const postQuote = async (req: Request, res: Response, next: NextFunction) => {
  const { quote } = req.body;
  const { username } = req.authUser;
  try {
    if (!quote) {
      return res.status(400).json({ error: '' });
    }
    const newQuote = new Quote({ user: username, quote });
    await newQuote.save();
    // eslint-disable-next-line no-underscore-dangle
    res.status(200).json({ message: messages.QUOTE_UPLOAD_SUCCESS, quote: newQuote });
  } catch (err: any) {
    next(new ERRORS.QuotesRoutesError(err.message));
  }
};

export const getQuotesFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotes = await Quote.find({ user: req.params.user });
    res.status(200).json(quotes);
  } catch (err: any) {
    next(new ERRORS.QuotesRoutesError(err.message));
  }
};

export const deleteQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Quote.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: messages.QUOTE_DELETE_SUCCESS });
  } catch (err: any) {
    next(new ERRORS.QuotesRoutesError(err.message));
  }
};
