import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'

export function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authorization token missing'))
  }
  try {
    const token = authHeader.split(' ')[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    return next()
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'))
  }
}

export function authorize(...roles) {
  return (req, _res, next) => {
    if (!roles.length) return next()
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden'))
    }
    return next()
  }
}

