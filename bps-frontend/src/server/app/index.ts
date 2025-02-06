import express, { NextFunction, Request, Response } from 'express'
import { fetchSharedData } from 'services/cmsService'
import appRouter from './routes'

const app = express()

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await fetchSharedData()
    req.shared = data
    next()
  } catch (error) {
    next(error)
  }
})

app.use('/', appRouter.getRouter())

export default app
