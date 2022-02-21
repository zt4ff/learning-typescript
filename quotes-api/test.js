const express = require('express');

const app = express();

const boomThrowAsync = () => Promise((resolve, reject) => {
  throw new Error('asynce boom throw');
});

const boomThrow = () => {
  throw new Error('boom throw');
};

app.get('/boom', (req, res, next) => {
  throw 'Welcome';
});

app.get('/boomasync', async (req, res, next) => {
  try {
    throw 'This will not be handled';
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500).send('Oh no!');
});

app.listen(3000, () => console.log('Listening on 3000!'));
