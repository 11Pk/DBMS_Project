import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'organ_network',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
}

// Create connection pool
const pool = mysql.createPool(dbConfig)

/**
 * Verify database connection
 * @throws {Error} If connection fails
 */
export async function verifyConnection() {
  try {
    const connection = await pool.getConnection()
    console.log(' Database connected successfully!')
    console.log(`Connected to: ${dbConfig.database} at ${dbConfig.host}:${dbConfig.port}`)
    await connection.ping()
    connection.release()
    return true
  } catch (error) {
    console.error('❌ Database connection failed!')
    console.error('Error details:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n🔧 Troubleshooting:')
      console.error('   - Make sure MySQL server is running')
      console.error('   - Check if the port is correct (default: 3306)')
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n🔧 Troubleshooting:')
      console.error('   - Check your database username and password in .env file')
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n🔧 Troubleshooting:')
      console.error(`   - Database '${dbConfig.database}' does not exist`)
      console.error('   - Run the schema.sql file to create the database')
      console.error('   - Command: mysql -u root -p < database/schema.sql')
    }
    
    throw error
  }
}

/**
 * Execute a query with error handling
 * @param {string} query - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} Query results
 */
export async function executeQuery(query, params = []) {
  try {
    const [results] = await pool.execute(query, params)
    return results
  } catch (error) {
    console.error('Query execution error:', error.message)
    console.error('Query:', query)
    throw error
  }
}

/**
 * Close database pool gracefully
 */
export async function closePool() {
  try {
    await pool.end()
    console.log('Database pool closed')
  } catch (error) {
    console.error('Error closing database pool:', error.message)
    throw error
  }
}

export { pool }

