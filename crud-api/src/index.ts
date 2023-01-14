//Required External Modules
import http from 'http';
import process from 'process';
import * as dotenv from "dotenv";

import { v1 as uuidv1 } from 'uuid';

import { Item } from "./items/item.interface";
import { items } from './items/items.interface';

dotenv.config();

const hostname: string | undefined | null = 'localhost';
const PORT = process.env.PORT || 3000;

http.createServer((request, response) => {
  console.log(`process.pid: ${process.pid} request received`);
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello, CRUD API!\n');
}).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});

console.log(`process.pid: ${process.pid} listening on PORT: ${PORT}`);
// Listening to http Server

//netstat -ano | findstr :4000
//taskkill /PID 8168 /F
//import { itemsRouter } from "./items/items.router";
//The basic syntax for doing this is npm uninstall -D package-name or npm uninstall --save-dev package-name

//https://habr.com/en/post/536512/
/**
 * App Variables
 */
/*
interface Post {
  title: string;
  content: string;
}

const posts: Post[] = [
  {
    title: 'Lorem ipsum',
    content: 'Dolor sit amet'
  }
];
*/

//https://wanago.io/2019/03/25/node-js-typescript-7-creating-a-server-and-receiving-requests/

/*


const server = createServer((request: IncomingMessage, response: ServerResponse) => {
  switch (request.url) {
    case '/posts': {
      response.setHeader('Content-Type', 'application/json');
      if (request.method === 'GET') {
        response.end(JSON.stringify(posts));
      } else if (request.method === 'POST') {
        getJSONDataFromRequestStream<Post>(request)
          .then(post => {
            posts.push(post);
            response.end(JSON.stringify(post));
          })
      }
      break;
    }
    case '/upload': {
      if (request.method === 'POST') {
        const chunks: Uint8Array[] = [];
        request.on('data', (chunk) => {
          chunks.push(chunk);
        });
        request.on('end', () => {
          const result = Buffer.concat(chunks).toString();
          response.end(result);
        });
      }
      break;
    }
    default: {
      response.statusCode = 404;
      response.end();
    }
  }
});
 
function getJSONDataFromRequestStream<T>(request: IncomingMessage): Promise<T> {
  return new Promise(resolve => {
    const chunks: Uint8Array[] = [];
    request.on('data', (chunk) => {
      chunks.push(chunk);
    });
    request.on('end', () => {
      resolve(
        JSON.parse(
          Buffer.concat(chunks).toString()
        )
      )
    });
  })
}
*/