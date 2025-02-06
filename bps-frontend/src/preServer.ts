
import path from 'path';
import dotenv from "dotenv"

import "app-module-path/register";

import logger from 'lib/logger'
import cluster from 'node:cluster'
import fs from 'node:fs'
dotenv.config();


process.on('unhandledRejection', (error, promise) => {
    logger.error('Unhandled exception', error);
    if (cluster.isWorker && cluster.worker) {
        cluster.worker.kill();
    }
    throw error;
});