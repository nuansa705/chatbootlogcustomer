const { Database } = require('sqlite3')

const dbPath = '/home/z/my-project/db/custom.db'

console.log('Checking database:', dbPath)

try {
  const db = new Database(dbPath, { fileMustExist: false })
  console.log('✅ Database opened')

  const count = db.prepare('SELECT COUNT(*) as count FROM customer_interactions').get()
  console.log('Total records:', count.count)

  if (count.count > 0) {
    const samples = db.prepare('SELECT * FROM customer_interactions LIMIT 3').all()
    console.log('Sample records:')
    console.log(JSON.stringify(samples, null, 2))
  }

  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
  console.log('Tables:', tables.map(t => t.name))

  db.close()
  console.log('✅ Database closed')
} catch (error) {
  console.error('❌ Error:', error)
}
