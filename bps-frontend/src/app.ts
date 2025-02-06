import './preServer'; // Always require this file at every application entry point

import { app } from "."
import fs from 'node:fs';
import path from 'path';
import https from 'node:http2';
import logger from 'lib/logger'
const startTime = new Date().getTime();

import { MOVED_PERMANENTLY } from 'http-codes';

process.on('uncaughtException', (error: any) => {
    if (
        error.details &&
        error.details.cause &&
        error.details.cause.code === 'ECONNREFUSED'
    ) {
        logger.error('Caught connection refused (handled): ', error);
    } else if (
        error.details &&
        error.details.cause &&
        error.details.cause.code === 'ECONNRESET'
    ) {
        logger.error('Caught connection reset (handled): ', error);
    } else if (error.code === 'ECONNRESET') {
        // "{\"code\":\"ECONNRESET\",\"errno\":\"ECONNRESET\",\"syscall\":\"read\"}"
        logger.error('Caught connection reset (unhandled): ', error);
    } else {
        logger.error('Uncaught Error: ', JSON.stringify(error));
        throw error;
    }
});

listen();

// Listen on our port
function listen() {
    const portConfig: number = Number(process.env.PORT || 80);
    let httpsServer = app;
    // if (process.env.NODE_ENV === 'production') {
    //     const CERT_DIR = process.env.CERT_DIR || '../../';
    //     const privateKey = fs.readFileSync(path.join(process.cwd(), CERT_DIR, 'server.key'), 'utf8');
    //     const certificate = fs.readFileSync(path.join(process.cwd(), CERT_DIR, 'server.cert'), 'utf8');
    //     const credentials = { key: privateKey, cert: certificate };
    //     httpsServer = require('https').createServer(credentials, app);
    // }
    const port = normalizePort(portConfig);
    httpsServer.listen(port, () => {
        const time = new Date().getTime() - startTime;
        logger.info(`App listening on the port ${port}`);
        logger.info(`App startup in ${time} milliseconds`);
    });
}

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}