const { Database } = require('sqlite3')
const fs = require('fs')

const dbPath = '/home/z/my-project/db/custom.db'

console.log('Creating SQLite database with exact schema...')

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
  const schemaSQL = `
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

CREATE INDEX IF NOT EXISTS idx_tanggal ON tiket_keluhan(tanggal);
CREATE INDEX IF NOT EXISTS idx_kode_tiket ON tiket_keluhan(kode_tiket);
CREATE INDEX IF NOT EXISTS idx_kode_customer ON tiket_keluhan(kode_customer);
CREATE INDEX IF NOT EXISTS idx_status_keluhan ON tiket_keluhan(status_keluhan);
CREATE INDEX IF NOT EXISTS idx_created_at ON tiket_keluhan(created_at);
`

  db.exec(schemaSQL)
  console.log('✅ Schema executed')

  // Insert sample data
  const insertSQL = `
INSERT INTO tiket_keluhan 
  (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES 
('30/09/2025', '#LAM09302025001', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'QR Code Aseta Printing', 'Bug/Error', 'Terdapat kendala dimana saat login pada Aplikasi QR code...', 'Lampiran', 'Closed', ''),
('15/10/2025', '#STR10152025001', 'STR', 'Semen Tiga Roda', 'Desktop', 'Advanced Reporting', 'Request', 'Permintaan untuk akses fitur advance reporting...', '-', 'Open', '')
`
  
  db.exec(insertSQL)
  console.log('✅ Sample data inserted')

  // Verify
  const countResult = db.exec('SELECT COUNT(*) as count FROM tiket_keluhan')
  console.log('Total records:', countResult)

  const samples = db.exec('SELECT * FROM tiket_keluhan LIMIT 3')
  console.log('Sample records:', samples)

  // Close database
  db.close()
  console.log('✅ Database closed')

  console.log('')
  console.log('========================================')
  console.log('✅ SUCCESS!')
  console.log('========================================')
  console.log('Database:', dbPath)
  console.log('Schema: As per your request')
  console.log('Table: tiket_keluhan')
  console.log('Records:', countResult[0].count)
  console.log('========================================')

} catch (error) {
  console.error('❌ Error:', error)
  process.exit(1)
}
