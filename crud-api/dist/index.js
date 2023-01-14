"use strict";
/**
 * Required External Modules
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const dotenv = __importStar(require("dotenv"));
const process_1 = __importDefault(require("process"));
const uuid_1 = require("uuid");
dotenv.config();
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
const items = [
    {
        id: (0, uuid_1.v1)(),
        username: 'myName',
        age: 69,
        hobbies: ['a', 'b', 'c'],
    }
];
const hostname = 'localhost';
const PORT = process_1.default.env.PORT || 3000;
// Creating http Server
let httpServer = (0, http_1.createServer)((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello, CRUD API!\n');
});
// Listening to http Server
httpServer.listen(PORT, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});
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
//# sourceMappingURL=index.js.map