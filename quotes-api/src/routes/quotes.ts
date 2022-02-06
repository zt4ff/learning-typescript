import express from 'express';
import {
  deleteQuote,
  getAllQuote, getQuotesFromUser, getSingleQuote, postQuote,
} from '../controllers/quotes';

const Router = express.Router();

Router.get('/quotes', getAllQuote);

Router.get('/quote/:id', getSingleQuote);

Router.post('/quote', postQuote);

Router.get('/quotes/:user', getQuotesFromUser);

Router.delete('/quote/:id', deleteQuote);

export const quotesRouter = Router;
