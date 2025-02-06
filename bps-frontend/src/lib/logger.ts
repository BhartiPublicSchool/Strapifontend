import winston from 'winston'

import { AsyncLocalStorage } from 'async_hooks'
import { NextFunction } from 'express'

import correlator from 'express-correlation-id'

export const asyncLocalStorage = new AsyncLocalStorage<Map<string, string>>()

export const getContext = () => {
  return asyncLocalStorage.getStore()
}

export const initContext = (
  metaData: Map<string, string>,
  next: NextFunction
) => {
  asyncLocalStorage.run(metaData, () => next())
}

export const appendMetaData = (
  metaData: Map<string, string>
): Map<string, string> => {
  const context = getContext()
  metaData.forEach((value: string, key: string) => context.set(key, value))
  return context
}

const tracerFormat = winston.format.printf((info: any) => {
  const correlationId = correlator.getId()
  const logContent = {
    ...info,
    ...(correlationId && { correlationId })
  }
  return JSON.stringify(logContent)
})

const winstonConfig = {
  level: process.env.loggerLevel || 'debug',
  format: tracerFormat,
  transports: [new winston.transports.Console()]
}
const log = winston.createLogger(winstonConfig)

export default log
