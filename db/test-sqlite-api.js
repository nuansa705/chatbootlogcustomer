const { Database } = require('sqlite3')
const dbPath = '/home/z/my-project/db/test.db'

console.log('Testing sqlite3 API...')
console.log('Database path:', dbPath)
console.log('')

// Create test database
const db = new Database(dbPath)

console.log('Database created')
console.log('Database type:', typeof db)
console.log('Database constructor:', db.constructor.name)
console.log('')

// Check available methods
const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(db)).filter(m => typeof db[m] === 'function')
console.log('Available methods:', methods.slice(0, 20))
console.log('')

// Create table
db.exec(`
  CREATE TABLE test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`)
console.log('✅ Table created')

// Try different ways to insert data
const stmt = db.prepare('INSERT INTO test (name) VALUES (?)')
stmt.run('Test 1')
console.log('✅ Insert 1 completed')

stmt.run('Test 2')
console.log('✅ Insert 2 completed')

// Try using run multiple times
db.prepare('INSERT INTO test (name) VALUES (?)').run('Test 3')
console.log('✅ Insert 3 completed')

// Try query
const all = db.prepare('SELECT * FROM test').all()
console.log('✅ Query completed')
console.log('Results:', all)

// Get
const one = db.prepare('SELECT * FROM test LIMIT 1').get()
console.log('✅ Get completed')
console.log('Result:', one)

db.close()
console.log('✅ Database closed')

console.log('')
console.log('SUCCESS: sqlite3 API works correctly!')
