//Required External Modules
import http from 'http';
import process from 'process';
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';
import { Objects, object as testObject, createObject, isValidUUID, isValidItem, postObject, putObject } from './items/items.service';
import { Item } from './items/item.interface';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

export const server = http.createServer((request, response): void => {
  //if (isValidItem(testObject)) createObject(testObject); //testing

  const id = request.url?.split('/')[3];

  switch (request.url) {
    case `/api/users`: {
      try {
        if (request.method === 'GET') {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(Objects.objects));
        } else if (request.method === 'POST') {
          request.on('data', (data) => {
            const postObject = JSON.parse(data);

            if (isValidItem(postObject)) {
              try {
                let newObject = {
                  id: uuidv4(),
                  ...postObject,
                };
                Objects.objects.push(newObject);
                response.writeHead(201, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(response.statusCode));
              } catch {
                response.writeHead(500);
                response.end('Internal Server Error');
              }
            } else {
              response.writeHead(404, { 'Content-Type': 'text/plain' });
              response.end('Not Found');
            }
          });
        } else if (request.method === 'PUT' || request.method === 'DELETE') {
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
          if (request.method === 'GET') {
            if (object) {
              response.writeHead(200, { 'Content-Type': 'application/json' });
              response.end(JSON.stringify(object));
            } else {
              response.writeHead(404, { 'content-type': 'text/plain' });
              response.end(`id === ${id} doesn't exist`);
            }
          } else if (request.method === 'PUT') {
            if (object) {
              request.on('data', (data) => {

                const putObject = JSON.parse(data);
                if (isValidItem(putObject)) {
                  Objects.objects.forEach((obj, index) => {
                    if (obj.id === id) {
                      Objects.objects[index] = { id: id, ...putObject };
                      response.writeHead(200, { 'Content-Type': 'application/json' });
                      response.end(JSON.stringify(response.statusCode));
                    }
                  })
                } else {
                  response.writeHead(400, { 'content-type': 'text/plain' });
                  response.end(`request body does not contain required fields`);
                }
              })
            } else {
              response.writeHead(404, { 'content-type': 'text/plain' });
              response.end(`id === ${id} doesn't exist`);
            }
          } else if (request.method === 'DELETE') {
            if (object) {
              Objects.objects = Objects.objects.filter(obj => obj.id !== id)
              response.writeHead(204, { 'content-type': 'text/plain' });
              response.end(JSON.stringify(response.statusCode));
            } else {
              response.writeHead(404, { 'content-type': 'text/plain' });
              response.end(`id === ${id} doesn't exist`);
            }
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