import express from 'express';
import cluster from 'cluster';
import { cpus } from 'os';
import http from 'http';

const createWorkers = () => {
  cpus().forEach(() => {
    const worker = cluster.fork();
    console.log(`worker ${worker.id} is created`);
  });
};

if (cluster.isPrimary) {
  // create new number of workers
  createWorkers();

  // logs when a worker is disconnected
  cluster.on('disconnect', (worker) => {
    console.log(`worker ${worker.id} got disconnected`);
  });

  cluster.on('exit', (worker) => {
    // logs that a server is shut down
    console.log(`worker ${worker.id} is shutdown`);

    // so we'd create a new worker running
    createWorkers();
  });
} else {
  const app = express();

  app.get('/test', (req, res) => {
    if (cluster.isWorker) {
      console.log(`request served by worker ${cluster.worker.id}`);
    }
    res.status(200).json({ message: 'success done' });
  });

  http.createServer(app).listen(4000, (err) => {
    if (cluster.isWorker) {
      console.log(`server ${cluster.worker!.id} is working`);
    }
  });
}
