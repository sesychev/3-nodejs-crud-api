"use strict";
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
exports.server = void 0;
//Required External Modules
const http_1 = __importDefault(require("http"));
const process_1 = __importDefault(require("process"));
const dotenv = __importStar(require("dotenv"));
const uuid_1 = require("uuid");
const items_service_1 = require("./items/items.service");
dotenv.config();
if (!process_1.default.env.PORT) {
    process_1.default.exit(1);
}
const PORT = parseInt(process_1.default.env.PORT, 10) || 3000;
exports.server = http_1.default.createServer((request, response) => {
    //if (isValidItem(testObject)) createObject(testObject); //testing
    const id = request.url?.split('/')[3];
    switch (request.url) {
        case `/api/users`: {
            try {
                if (request.method === 'GET') {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify(items_service_1.Objects.objects));
                }
                else if (request.method === 'POST') {
                    request.on('data', (data) => {
                        const postObject = JSON.parse(data);
                        if ((0, items_service_1.isValidItem)(postObject)) {
                            try {
                                let newObject = {
                                    id: (0, uuid_1.v4)(),
                                    ...postObject,
                                };
                                items_service_1.Objects.objects.push(newObject);
                                response.writeHead(201, { 'Content-Type': 'application/json' });
                                response.end(JSON.stringify(response.statusCode));
                            }
                            catch {
                                response.writeHead(500);
                                response.end('Internal Server Error');
                            }
                        }
                        else {
                            response.writeHead(404, { 'Content-Type': 'text/plain' });
                            response.end('Not Found');
                        }
                    });
                }
                else if (request.method === 'PUT' || request.method === 'DELETE') {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('Not Found');
                }
            }
            catch {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal Server Error');
            }
            break;
        }
        case `/api/users/${id}`: {
            if ((0, items_service_1.isValidUUID)(id)) {
                let object;
                try {
                    object = items_service_1.Objects.objects.find(obj => obj.id === id);
                }
                catch {
                    response.writeHead(500);
                    response.end('Internal Server Error');
                }
                try {
                    if (request.method === 'GET') {
                        if (object) {
                            response.writeHead(200, { 'Content-Type': 'application/json' });
                            response.end(JSON.stringify(object));
                        }
                        else {
                            response.writeHead(404, { 'content-type': 'text/plain' });
                            response.end(`id === ${id} doesn't exist`);
                        }
                    }
                    else if (request.method === 'PUT') {
                        if (object) {
                            request.on('data', (data) => {
                                const putObject = JSON.parse(data);
                                if ((0, items_service_1.isValidItem)(putObject)) {
                                    items_service_1.Objects.objects.forEach((obj, index) => {
                                        if (obj.id === id) {
                                            items_service_1.Objects.objects[index] = { id: id, ...putObject };
                                            response.writeHead(200, { 'Content-Type': 'application/json' });
                                            response.end(JSON.stringify(response.statusCode));
                                        }
                                    });
                                }
                                else {
                                    response.writeHead(400, { 'content-type': 'text/plain' });
                                    response.end(`request body does not contain required fields`);
                                }
                            });
                        }
                        else {
                            response.writeHead(404, { 'content-type': 'text/plain' });
                            response.end(`id === ${id} doesn't exist`);
                        }
                    }
                    else if (request.method === 'DELETE') {
                        if (object) {
                            items_service_1.Objects.objects = items_service_1.Objects.objects.filter(obj => obj.id !== id);
                            response.writeHead(204, { 'content-type': 'text/plain' });
                            response.end(JSON.stringify(response.statusCode));
                        }
                        else {
                            response.writeHead(404, { 'content-type': 'text/plain' });
                            response.end(`id === ${id} doesn't exist`);
                        }
                    }
                    if (request.method === 'POST') {
                        response.writeHead(404, { 'Content-Type': 'text/plain' });
                        response.end('Not Found');
                    }
                }
                catch {
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
    exports.server.on('error', () => {
        response.writeHead(500);
        response.end('Internal Server Error');
    });
}).listen(PORT, () => {
    console.log(`Server running as a ${process_1.default.env.NODE_ENV} process on ${PORT} port`);
});
//# sourceMappingURL=index.js.map