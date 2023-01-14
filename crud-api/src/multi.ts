import cluster from 'cluster';
import http from 'http';
import { AddressInfo } from 'net';
import { cpus } from 'os';
import process from 'process';

const numCPUs = cpus().length;
const hostname: string | undefined | null = 'localhost';
const PORT = 8000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 1; i <= numCPUs; i++) {
    cluster.fork();
    const server = http
      .createServer((req, res) => {
        res.writeHead(200);
        res.end(`Server is ${i}`);
      }).listen(PORT + i, () => {
        const address: string | AddressInfo | null = server.address() as AddressInfo;
        console.log(`Server running at http://${hostname}:${address.port}/`);
      });
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const server = http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end('hello world\n');
    }).listen(PORT, () => {
      const address: string | AddressInfo | null = server.address() as AddressInfo;
      console.log(`Server running at http://${hostname}:${address.port}/`);
    });

  console.log(`Worker ${process.pid} started`);
}