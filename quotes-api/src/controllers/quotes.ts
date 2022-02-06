import { NextFunction, Request, Response } from 'express';
import { Quote } from '../model/quote';
import { QuotesRoutesError } from '../helpers/errors';

export const getAllQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Quote.find({});
    return res.status(200).json(notes);
  } catch (err: any) {
    res.locals.error = new QuotesRoutesError(err.message);
    next(err);
  }
};

export const getSingleQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quote = await Quote.findById(req.params.id);
    res.status(200).json(quote);
  } catch (err: any) {
    res.locals.error = new QuotesRoutesError(err.message);
    next(err);
  }
};

export const postQuote = async (req: Request, res: Response, next: NextFunction) => {
  const { quote } = req.body;
  const { username } = req.authUser;
  try {
    if (!quote) {
      return res.status(400).json({ error: 'where is the quote bro' });
    }
    const newQuote = new Quote({ user: username, quote });
    await newQuote.save();
    // eslint-disable-next-line no-underscore-dangle
    res.status(200).json({ message: 'uploaded successfully', quote: newQuote });
  } catch (err: any) {
    res.locals.error = new QuotesRoutesError(err.message);
    next(err);
  }
};

export const getQuotesFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quotes = await Quote.find({ user: req.params.user });
    res.status(200).json(quotes);
  } catch (err: any) {
    res.locals.error = new QuotesRoutesError(err.message);
    next(err);
  }
};

export const deleteQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Quote.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deleted quote successfully' });
  } catch (err: any) {
    res.locals.error = new QuotesRoutesError(err.message);
    next(err);
  }
};
