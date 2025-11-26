// import express from 'express'
// import cors from 'cors'
// import morgan from 'morgan'
// import helmet from 'helmet'
// import authRoutes from './routes/authRoutes.js'
// import donorRoutes from './routes/donorRoutes.js'
// import recipientRoutes from './routes/recipientRoutes.js'
// import matchRoutes from './routes/matchRoutes.js'
// import adminRoutes from './routes/adminRoutes.js'
// import { notFound, errorHandler } from './middleware/errorHandler.js'

// const app = express()

// app.use(helmet())


// app.use(cors({
//   origin: 'http://localhost:5173',   // frontend origin
//   credentials: true,                 // allow cookies, auth headers
//   allowedHeaders: ['Content-Type', 'Authorization']
// }))

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// if (process.env.NODE_ENV !== 'production') {
//   app.use(morgan('dev'))
// }

// app.get('/health', (_req, res) => {
//   res.json({ status: 'ok', timestamp: Date.now() })
// })

// app.use('/api/auth', authRoutes)
// app.use('/api/donors', donorRoutes)
// app.use('/api/recipients', recipientRoutes)
// app.use('/api/matches', matchRoutes)
// app.use('/api/admin', adminRoutes)

// app.use(notFound)
// app.use(errorHandler)

// export default app

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import authRoutes from './routes/authRoutes.js'
import donorRoutes from './routes/donorRoutes.js'
import recipientRoutes from './routes/recipientRoutes.js'
import matchRoutes from './routes/matchRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()

<<<<<<< HEAD
// Helmet configuration
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))
=======
app.use(helmet())

// CORS configuration - allow multiple frontend ports
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
]
>>>>>>> cef92a6e1d40ea4ed8ad0ea70d4dbbc5d23bc503

// CORS configuration - must be before routes
app.use(cors({
<<<<<<< HEAD
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
=======
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,                 // allow cookies, auth headers
>>>>>>> cef92a6e1d40ea4ed8ad0ea70d4dbbc5d23bc503
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})

<<<<<<< HEAD
// API Routes
=======

>>>>>>> cef92a6e1d40ea4ed8ad0ea70d4dbbc5d23bc503
app.use('/api/auth', authRoutes)
app.use('/api/donors', donorRoutes)
app.use('/api/recipients', recipientRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/admin', adminRoutes)

// Error handlers
app.use(notFound)
app.use(errorHandler)

export default app