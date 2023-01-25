import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import * as dotenv from "dotenv";

dotenv.config();

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 1; i <= numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  import('./index');
  console.log(`Worker ${cluster.worker?.id} started, PID: ${process.pid}`);
}

//import http from 'http';
//import { AddressInfo } from 'net';
//const port = process.env.PORT;
//const host = process.env.HOST;
//const hostname: string | undefined | null = 'localhost';
/*
const server = http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hi, PID: ${process.pid}`);
  }).listen(port, () => {
    const address: string | AddressInfo | null = server.address() as AddressInfo;
    console.log(`Worker ${cluster.worker?.id} started, PID: ${process.pid}`);
    console.log(`Server running at http://${hostname}:${address.port}/`);
  });
*/