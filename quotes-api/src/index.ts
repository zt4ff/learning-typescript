/* eslint-disable import/no-extraneous-dependencies */
import http from 'http';
import cluster from 'cluster';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { cpus } from 'os';
import App from './app';

Sentry.init({
  dsn: 'https://1879c3ac0ae4433bb5a4e9539b594fb0@o446659.ingest.sentry.io/5455863',
  tracesSampleRate: 1.0,
});

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
    try {
      http.createServer(app).listen(PORT, () => {
        console.log(`worker ${cluster.worker!.id} server running`);
      });
    } catch (err) {
      console.log(`error starting server at worker ${cluster.worker!.id} server`);
    }
  });
}
