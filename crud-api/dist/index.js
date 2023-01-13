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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const http_1 = require("http");
//import { itemsRouter } from "./items/items.router";
dotenv.config();
const posts = [
    {
        title: 'Lorem ipsum',
        content: 'Dolor sit amet'
    }
];
const hostname = 'localhost';
const port = 5000;
const server = (0, http_1.createServer)((request, response) => {
    switch (request.url) {
        case '/posts': {
            response.setHeader('Content-Type', 'application/json');
            if (request.method === 'GET') {
                response.end(JSON.stringify(posts));
            }
            else if (request.method === 'POST') {
                getJSONDataFromRequestStream(request)
                    .then(post => {
                    posts.push(post);
                    response.end(JSON.stringify(post));
                });
            }
            break;
        }
        case '/upload': {
            if (request.method === 'POST') {
                const chunks = [];
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
function getJSONDataFromRequestStream(request) {
    return new Promise(resolve => {
        const chunks = [];
        request.on('data', (chunk) => {
            chunks.push(chunk);
        });
        request.on('end', () => {
            resolve(JSON.parse(Buffer.concat(chunks).toString()));
        });
    });
}
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//https://wanago.io/2019/03/25/node-js-typescript-7-creating-a-server-and-receiving-requests/
//# sourceMappingURL=index.js.map