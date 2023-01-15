//Required External Modules
import http from 'http';
import process from 'process';
import * as dotenv from "dotenv";
dotenv.config();

import { Objects } from './items/items.service';
import { object, createObject, isValidUUID, isValidItem } from './items/items.service';

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

export const server = http.createServer((request, response) => {
  createObject(object);

  const id = request.url?.split('/')[3];
  switch (request.url) {
    case `/api/users`: {
      try {
        if (request.method === 'GET') {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(Objects.objects));
        }
        if (request.method === 'POST') {
          response.end(JSON.stringify(Objects.objects));
        }
      } catch {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Internal Server Error');
      }
      break;
    }
    case `/api/users/${id}`: {
      try {
        if (request.method === 'GET') {
          let object;
          if (isValidUUID(id as string)) {
            try {
              object = Objects.objects.find(obj => obj.id === id)
            } catch {
              response.writeHead(500);
              response.end('Internal Server Error');
            }
            if (object) {
              response.writeHead(200, { 'Content-Type': 'application/json' });
              response.end(JSON.stringify(object));
            } else {
              response.writeHead(404, { 'content-type': 'text/plain' });
              response.end(`id === ${id} doesn't exist`);
            }
          }
          else {
            response.writeHead(400, { 'content-type': 'text/plain' });
            response.end(`${id} is invalid(not uuid)`);
          }
        }
        if (request.method === 'POST') {
          response.end(JSON.stringify(Objects.objects));
        }
        if (request.method === 'PUT') {
          response.end(JSON.stringify(Objects.objects));
        }
        if (request.method === 'DELETE') {
          response.end(JSON.stringify(Objects.objects));
        }
      } catch {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Internal Server Error');
      }
      break;
    }
    default: {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not Found');
    }
  }
  server.on('error', () => {
    response.writeHead(500);
    response.end('Internal Server Error');
  });
}).listen(PORT, () => {
  console.log(`Server running as a ${process.env.NODE_ENV} process on ${PORT} port`);
});