import compression from 'compression'
import cookieParser from 'cookie-parser'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import logger from 'lib/logger'
import { json as jsonParser, urlencoded as urlEncodedParser } from 'body-parser'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-codes'
import appRouter from 'server/app'
import apiRouter from 'server/api'
import { ValidationError } from 'express-validation'
import correlator from 'express-correlation-id'
import { isCodedError } from 'lib/error'
import { initJobs } from 'jobs'
import onExit from 'signal-exit'
import session from 'express-session'
// import toobusy from 'toobusy-js';

const app = express()
logger.info('starting connection')

initJobs()

// onExit(toobusy.shutdown);
app.use(cookieParser())
app.use(jsonParser())
app.use(urlEncodedParser({ extended: true }))

app.use(compression())

const allowedUrlsString = process.env.ALLOWED_URLS || ''
const allowedUrls = allowedUrlsString.split(',').filter(url => url)

const allowedScriptUrlsString = process.env.ALLOWED_SCRIPT_URLS || ''
const allowedScriptUrls = allowedScriptUrlsString.split(',').filter(url => url)
console.log(allowedScriptUrls);

const allowedConnectSrcString = process.env.ALLOWED_CONNECT_SRC || ''
const allowedConnectSrc = allowedConnectSrcString.split(',').filter(url => url)


app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          ...allowedUrls,
          ...allowedScriptUrls
        ],
        'script-src-attr': ["'self'", "'unsafe-inline'"],
        'form-action': [...allowedUrls],
        'connect-src': ["'self'", ...allowedConnectSrc],
        'default-src': ["'self'", ...allowedUrls],
        'img-src': ["'self'", ...allowedUrls]
      }
    }
  })
)

/* loading order is important, or all api calls will serve client's index.html instead */

app.use(function (req: Request, res: Response, next: NextFunction) {
  const origin = req?.headers?.origin || ''
  if (allowedUrls.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-xsrf-token'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

app.use(correlator())

/** Request Logging and Response Correlation Middleware */
app.use((req: Request, res: Response, done) => {
  const startHrTime = process.hrtime()
  res.set('X-Correlation-ID', correlator.getId())
  res.once('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime)
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6
    logger.info(
      `${req.method} ${req.originalUrl || req.baseUrl} ${
        res.statusCode
      } ${elapsedTimeInMs} ms`,
      {
        method: req.method,
        statusCode: res.statusCode
      }
    )
  })
  done()
})

app.set('view engine', 'ejs')
app.use(express.static('public', { index: false }))

app.use('/', appRouter)
app.use('/api/v1/', apiRouter)

app.use(notFoundHandler)
app.use(errorHandler)

function notFoundHandler (req: any, res: Response, next: NextFunction) {
  logger.warn(`Page not found for: ${req.originalUrl}`, null, req?.user)
  const err: any = new Error('Not Found')
  err.status = NOT_FOUND
  next(err)
}
const isValidationError = (err: any): boolean => {
  return err instanceof ValidationError
}

function errorHandler (err, req, res, next) {
  if (isValidationError(err)) {
    const details = err.details && err.details?.body
    const failingTypes = Object.keys(details)
    res.status(err?.statusCode || BAD_REQUEST).send({
      message: `${failingTypes[0]} ${details[failingTypes[0]].message}`
    })
  }

  if (isCodedError(err)) {
    const { code, statusCode, message, name } = err
    return res.status(statusCode).send({ code, name, message })
  } else {
    if (err.message) {
      logger.error(`errorHandler() - ${err.message}`);
      // return res.status(500).send(err?.path ? 'Something Went wrong!' : err.message)
      return res.status(500).send( err.message)
    } else {
      logger.error(`Server error for: ${req.originalUrl}`, null, req.user)
      res.status(err.status || INTERNAL_SERVER_ERROR).send(err.message)
    }
  }
}

export default app
