import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

async function checkSetup() {
  console.log('🔍 Checking Database Setup...\n')
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT) || 3306,
  }
  
  let connection = null
  
  try {
    // Check MySQL connection
    console.log('1️⃣  Testing MySQL connection...')
    connection = await mysql.createConnection(config)
    console.log('   ✅ MySQL server is reachable\n')
    
    // Check if database exists
    console.log('2️⃣  Checking if database exists...')
    const [databases] = await connection.query(`SHOW DATABASES LIKE '${process.env.DB_NAME || 'organ_network'}'`)
    
    if (databases.length === 0) {
      console.log('   ❌ Database not found\n')
      console.log('💡 Solution: Run the initialization script')
      console.log('   Command: npm run init-db\n')
      process.exit(1)
    }
    
    console.log(`   ✅ Database '${process.env.DB_NAME || 'organ_network'}' exists\n`)
    
    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || 'organ_network'}`)
    
    // Check tables
    console.log('3️⃣  Checking tables...')
    const [tables] = await connection.query('SHOW TABLES')
    
    const requiredTables = ['Users', 'Donors', 'Recipients', 'Hospitals', 'Matches', 'QualityChecks', 'Notifications']
    const existingTables = tables.map(t => Object.values(t)[0])
    
    let allTablesExist = true
    for (const table of requiredTables) {
      if (existingTables.includes(table)) {
        console.log(`   ✅ ${table}`)
      } else {
        console.log(`   ❌ ${table} (missing)`)
        allTablesExist = false
      }
    }
    
    if (!allTablesExist) {
      console.log('\n💡 Solution: Reinitialize the database')
      console.log('   Command: npm run init-db\n')
      process.exit(1)
    }
    
    console.log('\n🎉 Database setup is complete!')
    console.log('✅ All tables are present')
    console.log('\n🚀 You can now start the server with: npm run dev\n')
    
  } catch (error) {
    console.error('\n❌ Setup check failed!')
    console.error('Error:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 MySQL server is not running')
      console.error('   Start MySQL: net start MySQL80')
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Invalid credentials')
      console.error('   Check your .env file')
    }
    
    console.log('')
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

checkSetup()
