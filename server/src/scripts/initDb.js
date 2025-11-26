import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Initialize database with schema
 */
async function initializeDatabase() {
  let connection = null
  
  try {
    console.log(' Starting database initialization...\n')
    
    // Connect to MySQL without specifying database
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: Number(process.env.DB_PORT) || 3306,
      multipleStatements: true,
    }
    
    console.log(' Connecting to MySQL server...')
    console.log(`   Host: ${config.host}:${config.port}`)
    console.log(`   User: ${config.user}\n`)
    
    connection = await mysql.createConnection(config)
    console.log(' Connected to MySQL server!\n')
    
    // Read schema file
    const schemaPath = join(__dirname, '../../database/schema.sql')
    console.log(' Reading schema file...')
    const schema = readFileSync(schemaPath, 'utf8')
    
    // Execute schema
    console.log(' Executing schema...')
    await connection.query(schema)
    
    console.log('\nDatabase initialized successfully!')
    console.log(` Database: ${process.env.DB_NAME || 'organ_network'}`)
    console.log('\n You can now start the server with: npm run dev\n')
    
  } catch (error) {
    console.error('\n Database initialization failed!')
    console.error('Error:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n Troubleshooting:')
      console.error('   - Make sure MySQL server is running')
      console.error('   - Check if MySQL is installed: mysql --version')
      console.error('   - Start MySQL service:')
      console.error('     Windows: net start MySQL80 (or MySQL57)')
      console.error('     Mac: brew services start mysql')
      console.error('     Linux: sudo systemctl start mysql')
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n🔧 Troubleshooting:')
      console.error('   - Check your MySQL username and password')
      console.error('   - Update the .env file with correct credentials')
      console.error('   - Test login: mysql -u root -p')
    } else if (error.code === 'ENOENT') {
      console.error('\n🔧 Troubleshooting:')
      console.error('   - Schema file not found at: database/schema.sql')
    }
    
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('Connection closed.')
    }
  }
}

// Run initialization
initializeDatabase()
