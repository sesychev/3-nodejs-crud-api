/**
 * Required External Modules
 */

import * as dotenv from "dotenv";

import { createServer, IncomingMessage, ServerResponse } from 'http';
 
 //import { itemsRouter } from "./items/items.router";
 
dotenv.config();
//https://habr.com/en/post/536512/ 
/**
 * App Variables
 */

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

const hostname = '127.0.0.1';
const port = 7000;


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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//https://wanago.io/2019/03/25/node-js-typescript-7-creating-a-server-and-receiving-requests/