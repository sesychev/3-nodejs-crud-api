//Required External Modules
import http from 'http';
import process from 'process';
import * as dotenv from "dotenv";
dotenv.config();

import { Objects } from './items/items.service';
import { object as getObject, createObject, putObject, isValidUUID, isValidItem } from './items/items.service';
import { Item } from './items/item.interface';

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

export const server = http.createServer((request, response) => {
  createObject(getObject); //testing

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
        if (request.method === 'PUT' || request.method === 'DELETE') {
          response.writeHead(404, { 'Content-Type': 'text/plain' });
          response.end('Not Found');
        }
      } catch {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Internal Server Error');
      }
      break;
    }
    case `/api/users/${id}`: {
      if (isValidUUID(id as string)) {
        let object: Item | undefined;
        try {
          object = Objects.objects.find(obj => obj.id === id)
        } catch {
          response.writeHead(500);
          response.end('Internal Server Error');
        }
        try {
          //get
          if (request.method === 'GET') {
            if (object) {
              response.writeHead(200, { 'Content-Type': 'application/json' });
              response.end(JSON.stringify(object));
            } else {
              response.writeHead(404, { 'content-type': 'text/plain' });
              response.end(`id === ${id} doesn't exist`);
            }
          }
          //put
          if (request.method === 'PUT') {
            if (object) {
              request.on('data', (body) => {
                const putObject = JSON.parse(body);
                if (isValidItem(getObject)) {
                  Objects.objects.map((obj, index) => {
                    if (obj.id === id) Objects.objects[index] = { ...obj, ...putObject };
                  })
                  response.writeHead(200, { 'Content-Type': 'application/json' });
                  response.end(JSON.stringify(response.statusCode));
                } else {
                  response.writeHead(400, { 'content-type': 'text/plain' });
                  response.end(`request body does not contain required fields`);
                }
              })
            } else {
              response.writeHead(404, { 'content-type': 'text/plain' });
              response.end(`id === ${id} doesn't exist`);
            }
          }
          //delete
          if (request.method === 'DELETE') {
            //tbd
            response.end(JSON.stringify(Objects.objects));
          }
          if (request.method === 'POST') {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Not Found');
          }
        } catch {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Internal Server Error');
        }
      }
      else {
        response.writeHead(400, { 'content-type': 'text/plain' });
        response.end(`${id} is invalid(not uuid)`);
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