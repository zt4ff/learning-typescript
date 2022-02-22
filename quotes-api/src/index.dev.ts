import http from 'http';
import App from './app';

// this file should be excluded from production build
const PORT = process.env.PORT || 3000;

App().then((app) => {
  try {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (err) {
    console.log('Error starting server');
  }
});
