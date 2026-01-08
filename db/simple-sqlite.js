const { Database } = require('sqlite3')
const fs = require('fs')

const dbPath = '/home/z/my-project/db/custom.db'

console.log('Creating simple SQLite database with schema...')

try {
  // Remove existing
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath)
    console.log('✅ Old database removed')
  }

  // Create database
  const db = new Database(dbPath)
  console.log('✅ Database created')

  // Create table with schema yang Anda berikan
  const schema = `
    CREATE TABLE tiket_keluhan (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tanggal DATE NOT NULL,
        kode_tiket TEXT NOT NULL UNIQUE,
        kode_customer TEXT,
        customer TEXT,
        platform TEXT,
        menu TEXT,
        jenis TEXT,
        keluhan_permintaan TEXT,
        lampiran TEXT,
        status_keluhan TEXT,
        remarks TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `

  db.exec(schema)
  console.log('✅ Table created')

  // Insert some test data
  const stmt = db.prepare(`
    INSERT INTO tiket_keluhan 
    (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  // Test data
  stmt.run(
    '30/09/2025',
    '#LAM09302025001',
    'LAM',
    'Lycon Asia Mandiri',
    'Printer App',
    'QR Code Aseta Printing',
    'Bug/Error',
    'Terdapat kendala dimana saat login pada Aplikasi QR code...',
    'Lampiran',
    'Closed',
    ''
  )

  stmt.run(
    '15/10/2025',
    '#STR10152025001',
    'STR',
    'Semen Tiga Roda',
    'Desktop',
    'Advanced Reporting',
    'Request',
    'Permintaan untuk akses fitur advance reporting...',
    '-',
    'Open',
    ''
  )

  stmt.finalize()

  // Verify
  const count = db.prepare('SELECT COUNT(*) as count FROM tiket_keluhan').get()
  console.log('✅ Test data inserted')
  console.log('Total records:', count.count)

  // Sample query
  const samples = db.prepare('SELECT * FROM tiket_keluhan LIMIT 2').all()
  console.log('Sample records:')
  samples.forEach((s, i) => {
    console.log(`  ${i + 1}. ${s.kode_tiket} - ${s.customer}`)
  })

  // Close
  db.close()
  console.log('✅ Database closed')

  console.log('')
  console.log('========================================')
  console.log('✅ DATABASE READY!')
  console.log('========================================')
  console.log('Database path:', dbPath)
  console.log('Table: tiket_keluhan')
  console.log('Records:', count.count)
  console.log('Schema: As per your request')
  console.log('========================================')

} catch (error) {
  console.error('❌ Error:', error)
  if (fs.existsSync(dbPath)) {
    try {
      fs.unlinkSync(dbPath)
    } catch (e) {
      // Ignore
    }
  }
  process.exit(1)
}
