/* eslint-disable import/no-extraneous-dependencies */
import http from 'http';
import dontenv from 'dotenv';
import App from './app';

dontenv.config();

const PORT = process.env.PORT || 3000;

App().then((app) => {
  http.createServer(app).listen(PORT, (err: Error) => {
    if (err) {
      console.log(err.message);
      process.exit(1);
    }
    console.log('Server running at port ', PORT);
  });
});
