// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import ApiError from '../utils/ApiError.js'
// import * as userModel from '../models/userModel.js'

// function createToken(user) {
//   return jwt.sign(
//     { id: user.id, role: user.role, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
//   )
// }

// export async function register(req, res, next) {
//   try {
//     const { name, email, password, role, age, blood_group } = req.body
//     if (!name || !email || !password || !role) {
//       throw new ApiError(400, 'Name, email, password and role are required')
//     }
//     const existing = await userModel.findByEmail(email)
//     if (existing) {
//       throw new ApiError(409, 'Email already registered')
//     }
//     const hashed = await bcrypt.hash(password, 10)
//     const user = await userModel.createUser({
//       name,
//       email,
//       password: hashed,
//       role,
//       age: age || null,
//       blood_group: blood_group || null,
//     })
//     const token = createToken(user)
//     res.status(201).json({ success: true, data: { user, token } })
//   } catch (error) {
//     next(error)
//   }
// }

// export async function login(req, res, next) {
//   try {
//     const { email, password } = req.body
//     if (!email || !password) {
//       throw new ApiError(400, 'Email and password are required')
//     }
//     const user = await userModel.findByEmail(email)
//     if (!user) {
//       throw new ApiError(401, 'Invalid credentials')
//     }
//     const valid = await bcrypt.compare(password, user.password)
//     if (!valid) {
//       throw new ApiError(401, 'Invalid credentials')
//     }
//     delete user.password
//     const token = createToken(user)
//     res.json({ success: true, data: { user, token } })
//   } catch (error) {
//     next(error)
//   }
// }

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
    
    // Validate required fields
    if (!name || !email || !password || !role) {
      throw new ApiError(400, 'Name, email, password and role are required')
    }
    
    // Validate role
    const validRoles = ['donor', 'recipient', 'admin', 'hospital']
    if (!validRoles.includes(role)) {
      throw new ApiError(400, 'Invalid role. Must be: donor, recipient, admin, or hospital')
    }
    
    // Check if user already exists
    const existing = await userModel.findByEmail(email)
    if (existing) {
      throw new ApiError(409, 'Email already registered')
    }
    
    // Hash password
    const hashed = await bcrypt.hash(password, 10)
    
    // Create user
    const user = await userModel.createUser({
      name,
      email,
      password: hashed,
      role,
      age: age || null,
      blood_group: blood_group || null,
    })
    
    // Generate token
    const token = createToken(user)
    
    // Remove password from response
    delete user.password
    
    res.status(201).json({ 
      success: true, 
      data: { 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          age: user.age,
          blood_group: user.blood_group
        }, 
        token 
      } 
    })
  } catch (error) {
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    
    // Validate input
    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required')
    }
    
    // Find user
    const user = await userModel.findByEmail(email)
    if (!user) {
      throw new ApiError(401, 'Invalid email or password')
    }
    
    // Verify password
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new ApiError(401, 'Invalid email or password')
    }
    
    // Remove password from user object
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      age: user.age,
      blood_group: user.blood_group
    }
    
    // Generate token
    const token = createToken(userWithoutPassword)
    
    res.json({ 
      success: true, 
      data: { 
        user: userWithoutPassword, 
        token 
      } 
    })
  } catch (error) {
    next(error)
  }
}