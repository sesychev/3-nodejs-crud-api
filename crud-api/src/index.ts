/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import http from 'http';
 
//import { itemsRouter } from "./items/items.router";
 
dotenv.config();
 
/**
 * App Variables
 */


const hostname = '127.0.0.1';
const port = 7000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});