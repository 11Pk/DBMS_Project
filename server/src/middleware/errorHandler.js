import ApiError from '../utils/ApiError.js'

export function notFound(_req, _res, next) {
  next(new ApiError(404, 'Route not found'))
}

export function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error'
  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }
  res.status(statusCode).json({
    success: false,
    error: message,
  })
}

