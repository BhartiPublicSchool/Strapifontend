declare module 'axios' {
  interface AxiosRequestConfig {
    meta?: {
      startTime?: number,
      correlationId?: string
    }
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    shared?: any
  }
}


export enum QUALITY {
  LARGE = 'large'
}
