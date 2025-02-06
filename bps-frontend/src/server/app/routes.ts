import { NextFunction, Request, Response, Router } from 'express'
import {
    fetchBPSDifferencePageContent,
  fetchExploreCampusPageContent,
  fetchExploreCampusSlidesPageContent,
  fetchHomePageContent,
  fetchLandingPageContent,
  fetchMissionPageContent
} from 'services/cmsService'
import { QUALITY } from 'types'
import * as handler from 'utils/mediaUtils'
import md from 'utils/markdown'

const cmsBaseUrl =
  process.env.NODE_ENV === 'Development' ? `${process.env.CMS_API_URL}` : ''

class AppRouter {
  private router = Router()

  public getRouter (): Router {
    return this.router
  }

  constructor () {
    this.initializeRoutes()
  }

  private initializeRoutes () {
    this.router.get('/', this.landingPageHandler)
    this.router.get('/home', this.homePageHandler)
    this.router.get('/mission', this.missionPageHandler)
    this.router.get('/explore-campus', this.exploreCampusPageHandler)
    this.router.get('/explore-campus/slides', this.exploreCampusSlidesHandler)

    this.router.get('/the-bps-difference', this.TheBPSDifferencePageHandler)

    this.router.get('/leadership', this.exploreCampusPageHandler)
    this.router.get('/admission-faq', this.exploreCampusPageHandler)
    this.router.get('/apply', this.exploreCampusPageHandler)
    this.router.get('/tuition-fees', this.exploreCampusPageHandler)
    this.router.get('/a-rich-history', this.exploreCampusPageHandler)
    this.router.get('/lower-school', this.exploreCampusPageHandler)
    this.router.get('/middle-school', this.exploreCampusPageHandler)
    this.router.get('/upper-school', this.exploreCampusPageHandler)
    this.router.get('/athletics', this.exploreCampusPageHandler)
    this.router.get('/faculty', this.exploreCampusPageHandler)
    this.router.get('/contact', this.exploreCampusPageHandler)
    this.router.get('/parent', this.exploreCampusPageHandler)
    this.router.get('/student', this.exploreCampusPageHandler)
    this.router.get('/alumni', this.exploreCampusPageHandler)
    this.router.get('/alumni/modals', this.exploreCampusPageHandler)
    this.router.get('/forms-certificates', this.exploreCampusPageHandler)
    this.router.get('/academics', this.exploreCampusPageHandler)
    this.router.get('/news-announcement/modals', this.exploreCampusPageHandler)
    this.router.get('/search', this.exploreCampusPageHandler)
    this.router.get('/creative-arts', this.exploreCampusPageHandler)
    this.router.get('/community-outreach', this.exploreCampusPageHandler)
    this.router.get('/outdoor-education', this.exploreCampusPageHandler)
    this.router.get('/employment', this.exploreCampusPageHandler)
    this.router.get('/life-at-bps', this.exploreCampusPageHandler)
    this.router.get('/beyond-books', this.exploreCampusPageHandler)
    this.router.get('/academics', this.exploreCampusPageHandler)
    this.router.get('/academics', this.exploreCampusPageHandler)
    // this.router.get('*', this.exploreCampusPageHandler)
  }

  async landingPageHandler (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await fetchLandingPageContent()
      res.render('home', {
        data,
        common: req.shared,
        md,
        cmsBaseUrl,
        handler,
        quality: QUALITY.LARGE
      })
    } catch (error) {
      next(error)
    }
  }

  async homePageHandler (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await fetchHomePageContent()
      res.render('bps_home', {
        data,
        md,
        common: req.shared,
        cmsBaseUrl,
        handler: handler,
        quality: QUALITY.LARGE
      })
    } catch (error) {
      next(error)
    }
  }

  async missionPageHandler (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await fetchMissionPageContent()
      res.render('mission', {
        data,
        md,
        common: req.shared,
        cmsBaseUrl,
        handler: handler,
        quality: QUALITY.LARGE
      })
    } catch (error) {
      next(error)
    }
  }

  async exploreCampusPageHandler (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await fetchExploreCampusPageContent()
      res.render('explore-campus', {
        data,
        md,
        common: req.shared,
        cmsBaseUrl,
        handler: handler,
        quality: QUALITY.LARGE
      })
    } catch (error) {
      next(error)
    }
  }

  async exploreCampusSlidesHandler (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await fetchExploreCampusSlidesPageContent()
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async TheBPSDifferencePageHandler (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await fetchBPSDifferencePageContent()
      res.render('the-bps-difference', {
        data,
        md,
        common: req.shared,
        cmsBaseUrl,
        handler: handler,
        quality: QUALITY.LARGE
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new AppRouter()
