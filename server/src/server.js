import dotenv from 'dotenv'
import app from './app.js'
import { verifyConnection } from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 5000

async function bootstrap() {
  try {
    await verifyConnection()
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to database', error)
    process.exit(1)
  }
}

bootstrap()

