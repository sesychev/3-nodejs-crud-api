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
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
const process_1 = __importDefault(require("process"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const numCPUs = (0, os_1.cpus)().length;
if (cluster_1.default.isPrimary) {
    console.log(`Primary ${process_1.default.pid} is running`);
    for (let i = 1; i <= numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    Promise.resolve().then(() => __importStar(require('./index')));
    console.log(`Worker ${cluster_1.default.worker?.id} started, PID: ${process_1.default.pid}`);
}
//import http from 'http';
//import { AddressInfo } from 'net';
//const port = process.env.PORT;
//const host = process.env.HOST;
//const hostname: string | undefined | null = 'localhost';
/*
const server = http
  .createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hi, PID: ${process.pid}`);
  }).listen(port, () => {
    const address: string | AddressInfo | null = server.address() as AddressInfo;
    console.log(`Worker ${cluster.worker?.id} started, PID: ${process.pid}`);
    console.log(`Server running at http://${hostname}:${address.port}/`);
  });
*/ 
//# sourceMappingURL=cluster.js.map