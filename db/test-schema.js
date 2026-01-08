const { Database } = require('sqlite3')
const fs = require('fs')

const dbPath = '/home/z/my-project/db/custom.db'

console.log('Creating SQLite database at:', dbPath)

try {
  // Remove existing
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath)
    console.log('✅ Existing database removed')
  }

  // Create new database
  const db = new Database(dbPath)
  console.log('✅ Database created')

  // Create table with schema yang Anda berikan
  const schemaSQL = `
-- Drop existing table
DROP TABLE IF EXISTS tiket_keluhan;

-- Create tiket_keluhan table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tanggal ON tiket_keluhan(tanggal);
CREATE INDEX IF NOT EXISTS idx_kode_tiket ON tiket_keluhan(kode_tiket);
CREATE INDEX IF NOT EXISTS idx_kode_customer ON tiket_keluhan(kode_customer);
CREATE INDEX IF NOT EXISTS idx_status_keluhan ON tiket_keluhan(status_keluhan);
CREATE INDEX IF NOT EXISTS idx_created_at ON tiket_keluhan(created_at);
`
  
  db.exec(schemaSQL)
  console.log('✅ Schema executed')

  // Insert test data
  const stmt = db.prepare(`
    INSERT INTO tiket_keluhan 
    (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  // Test insert
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
  
  console.log('✅ Test record inserted')
  
  // Verify
  const all = db.prepare('SELECT * FROM tiket_keluhan').all()
  console.log('✅ Query completed')
  console.log('Total records:', all ? all.length : 0)

  // Close
  db.close()
  console.log('✅ Database closed')

  console.log('')
  console.log('========================================')
  console.log('✅ DATABASE READY!')
  console.log('========================================')
  console.log('Database file:', dbPath)
  console.log('Table: tiket_keluhan')
  console.log('Total records:', all ? all.length : 0)
  console.log('========================================')

} catch (error) {
  console.error('❌ Error:', error)
  process.exit(1)
}
