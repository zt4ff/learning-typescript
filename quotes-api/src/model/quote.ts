import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  user: String,
  quote: String,
});

export const Quote = mongoose.model('Quotes', QuoteSchema);
