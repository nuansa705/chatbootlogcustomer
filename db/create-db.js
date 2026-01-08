const { Database } = require('sqlite3')
const fs = require('fs')

const dbPath = '/home/z/my-project/db/custom.db'
const schemaPath = '/home/z/my-project/db/schema.sql'

console.log('Creating database at:', dbPath)

// Remove existing database if exists
if (fs.existsSync(dbPath)) {
  console.log('Removing existing database...')
  try {
    fs.unlinkSync(dbPath)
    console.log('Existing database removed')
  } catch (error) {
    console.error('Error removing database:', error)
  }
}

// Read schema file
let schema
try {
  schema = fs.readFileSync(schemaPath, 'utf8')
  console.log('✅ Schema read successfully')
} catch (error) {
  console.error('❌ Error reading schema:', error)
  process.exit(1)
}

console.log('Schema length:', schema.length)
console.log('Schema preview:', schema.substring(0, 200))

// Create database
let db
try {
  db = new Database(dbPath)
  console.log('✅ Database created')
} catch (error) {
  console.error('❌ Error creating database:', error)
  process.exit(1)
}

console.log('Executing schema...')

try {
  db.exec(schema)
  console.log('✅ Schema executed successfully!')
} catch (error) {
  console.error('❌ Error executing schema:', error)
  try {
    db.close()
  } catch (closeError) {
    console.error('Error closing database:', closeError)
  }
  process.exit(1)
}

// Verify tables
try {
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
  console.log('Tables in database:', tables)
} catch (error) {
  console.error('❌ Error querying tables:', error)
}

// Close database
db.close((err) => {
  if (err) {
    console.error('❌ Error closing database:', err)
    process.exit(1)
  } else {
    console.log('✅ Database closed successfully!')
  }

  console.log('========================================')
  console.log('✅ Database setup completed!')
  console.log('========================================')
  console.log('Database path:', dbPath)
  console.log('Now you can run: bun run db/import-from-sheets.js')
  console.log('========================================')
})
