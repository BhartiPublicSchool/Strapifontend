import log from 'lib/logger'
import { OK, UNAUTHORIZED } from 'http-codes'
import { NextFunction, Request, Response } from 'express'

export function blockXSRF (req, res, next) {
  try {
    if (req.method !== 'GET') {
      const cookieToken = req.cookies?.[process.env.XSRF_TOKEN_HTTPONLY_NAME]
      const headerToken = req.get(
        String(process.env.XSRF_HEADER_NAME).toLowerCase()
      )
      if (cookieToken && headerToken && cookieToken === headerToken) {
        next()
      } else {
        log.info('xsrf check failed', null, req.user?.email)
        res.sendStatus(UNAUTHORIZED)
      }
    } else {
      // Don't apply CSRF protection to GET requests (they don't make changes, and it interferes with image loads, etc.)
      next()
    }
  } catch (error) {
    log.error('xsrf Error', null, req.user?.email)
    res.sendStatus(UNAUTHORIZED)
  }
}
