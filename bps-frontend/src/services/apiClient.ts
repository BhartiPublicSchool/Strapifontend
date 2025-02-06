import axios from 'axios'
import axiosRetry from 'axios-retry'
import log from 'lib/logger'
import correlator from 'express-correlation-id'

const apiClient = axios.create({
  baseURL: process.env.CMS_API_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosRetry(apiClient, {
  retries: Number(process.env.CMS_CALL_RETRIES),
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error => {
    return (
      error.response?.status === 500 ||
      axiosRetry.isNetworkOrIdempotentRequestError(error)
    )
  }
})

apiClient.interceptors.request.use(config => {
  config.meta = { startTime: Date.now(), correlationId: correlator.getId() } // Store start time as a number (milliseconds)
  return config
})

apiClient.interceptors.response.use(
  response => {
    const duration = Date.now() - response.config.meta?.startTime
    log.debug(`Request to ${response.config.url} success took ${duration} ms`)
    return response && response.data
  },
  error => {
    const duration = Date.now() - error.config.meta?.startTime
    log.debug(`Request to ${error.config.url} failed after ${duration} ms`)
    return Promise.reject(error)
  }
)

export default apiClient
