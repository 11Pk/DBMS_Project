import dotenv from 'dotenv'
import app from './app.js'
import { verifyConnection, closePool } from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 5000

async function bootstrap() {
  try {
    console.log('🚀 Starting Organ Donation Network API Server...\n')
    
    // Verify database connection
    await verifyConnection()
    
    // Start server
    const server = app.listen(PORT, () => {
      console.log('\n✅ Server is running!')
      console.log(`🌐 API Server: http://localhost:${PORT}`)
      console.log(`💚 Health Check: http://localhost:${PORT}/health`)
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}\n`)
    })

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('\n⚠️  SIGTERM signal received: closing HTTP server')
      server.close(async () => {
        console.log('HTTP server closed')
        // await closePool()
        process.exit(0)
      })
    })

    process.on('SIGINT', async () => {
      console.log('\n⚠️  SIGINT signal received: closing HTTP server')
      server.close(async () => {
        console.log('HTTP server closed')
        // await closePool()
        process.exit(0)
      })
    })

  } catch (error) {
    console.error('\n❌ Failed to start server!')
    console.error('Error:', error.message)
    
    console.error('\n📋 Setup Instructions:')
    console.error('1. Copy .env.example to .env: cp .env.example .env')
    console.error('2. Update .env with your MySQL credentials')
    console.error('3. Initialize database: npm run init-db')
    console.error('4. Start the server: npm run dev\n')
    
    process.exit(1)
  }
}

bootstrap()

