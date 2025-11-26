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

app.use(helmet())

// CORS configuration - allow multiple frontend ports
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
]

app.use(cors({
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
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})


app.use('/api/auth', authRoutes)
app.use('/api/donors', donorRoutes)
app.use('/api/recipients', recipientRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)

export default app

