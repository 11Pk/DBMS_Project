import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'
import * as userModel from '../models/userModel.js'

function createToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
  )
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role, age, blood_group } = req.body
    if (!name || !email || !password || !role) {
      throw new ApiError(400, 'Name, email, password and role are required')
    }
    const existing = await userModel.findByEmail(email)
    if (existing) {
      throw new ApiError(409, 'Email already registered')
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = await userModel.createUser({
      name,
      email,
      password: hashed,
      role,
      age: age || null,
      blood_group: blood_group || null,
    })
    const token = createToken(user)
    res.status(201).json({ success: true, data: { user, token } })
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required')
    }
    const user = await userModel.findByEmail(email)
    if (!user) {
      throw new ApiError(401, 'Invalid credentials')
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new ApiError(401, 'Invalid credentials')
    }
    delete user.password
    const token = createToken(user)
    res.json({ success: true, data: { user, token } })
  } catch (error) {
    next(error)
  }
}

