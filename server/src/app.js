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


app.use(cors({
  origin: 'http://localhost:5173',   // frontend origin
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

