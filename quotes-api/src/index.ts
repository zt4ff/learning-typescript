/* eslint-disable import/no-extraneous-dependencies */
import http from 'http';
import dontenv from 'dotenv';
import cluster from 'cluster';
import { cpus } from 'os';
import App from './app';

dontenv.config();

const PORT = process.env.PORT || 3000;

const startWorker = () => {
  const worker = cluster.fork();
  console.log(`Worker started at ${worker.id}`);
};

if (cluster.isPrimary) {
  // starts a new cluster based on the server
  cpus().forEach(() => {
    startWorker();
  });

  cluster.on('disconnect', (worker) => {
    console.log(`cluster ${worker.id} is disconnected`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.id} died with exit code ${code} and signal (${signal})`);
    // start a new worker again when a cluster shuts down
    // TODO - add a production and development logging feature - datadog vs sentry
    startWorker();
  });
} else {
  App().then((app) => {
    http.createServer(app).listen(PORT);
  });
}
