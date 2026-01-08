const { Database } = require('better-sqlite3')
const fs = require('fs')

// Sample data dari Google Sheets / Excel
// Data ini diambil dari spreadsheet:
// https://docs.google.com/spreadsheets/d/1wFvF0dH_kkN4uB4GVuJZozvSzVpdr59TlJJH2iTHH-E

const customerData = [
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Terdapat kendala dimana saat login pada Aplikasi QR code, terdapat masalah seperti pada gambar yang dilampirkan. Isu tersebut terjadi karena perbedaan pada awal huruf username. Contohnya randi.suria@lycon.co.id dan Randi.suria@lycon.co.id' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Terdapat kendala pada saat proses upload aset photo. Foto yang diupload tidak muncul di sistem. Sudah di coba beberapa kali namun hasilnya tetap sama.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Mohon info untuk fitur input setup data. Apakah ada dokumentasi atau panduan yang tersedia?' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Laporan untuk stock opname yang dilakukan pada tanggal kemarin. Mohon verifikasi data stock yang tersimpan.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Error saat melakukan sync data antara aplikasi printer app dan sistem. Data tidak sinkron.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Tampilan dashboard loading sangat lama saat pertama kali login. Lebih dari 30 detik.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Menu QR Code Aseta Printing tidak bisa diakses. Muncul error 404.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Saat mencetak QR code, hasilnya blur/tidak jelas. Mohon dicek kualitas cetaknya.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Aplikasi sering force close secara tiba-tiba tanpa pesan error yang jelas.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Permintaan untuk menambah user baru. User: john.doe@lycon.co.id' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Tidak bisa logout dari aplikasi. Tombol logout tidak merespon saat diklik.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Notifikasi tidak muncul di aplikasi. Padahal sudah ada tiket baru yang dibuat.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Search function tidak bekerja dengan baik. Hasil pencarian tidak akurat.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Profile user tidak bisa diupdate. Data kembali ke nilai awal setelah disimpan.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Export to PDF error saat ingin mengunduh laporan. File PDF tidak bisa di-download.' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', keluhan: 'Terdapat duplicate data di sistem. Mohon dilakukan cleanup data duplikat.' },
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', keluhan: 'Save pada saat stock opname untuk Customer KSA mengalami force close. Tapi ketika ditelusur oleh tim operasional tidak ada force close yang terjadi melainkan data yang di save tidak tersimpan' },
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', keluhan: 'User KSA melaporkan tidak bisa login ke sistem. Error message: "Invalid credentials" padahal password sudah benar.' },
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', keluhan: 'Request untuk reset password user KSA. User: ks.admin@sagalaya.com' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Permintaan untuk akses fitur advance reporting. User STR membutuhkan laporan detail bulanan.' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Data loading lambat saat mengakses dashboard overview. Perlu optimasi query database.' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Error connection timeout saat koneksi ke database server. Perlu cek setting timeout.' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Report generation error. Laporan tidak bisa digenerate karena ada null value di data field.' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Notifikasi email tidak terkirim ke user. Mohon cek konfigurasi SMTP server.' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Backup database gagal dijalankan otomatis. Mohon manual setup backup schedule.' }
]

const dbPath = '/home/z/my-project/db/custom.db'
const schemaPath = '/home/z/my-project/db/schema.sql'

console.log('========================================')
console.log('Import Customer Data to SQLite')
console.log('========================================')
console.log('Database path:', dbPath)
console.log('Schema path:', schemaPath)
console.log('Total records to import:', customerData.length)
console.log('')

// Step 1: Remove existing database if exists
if (fs.existsSync(dbPath)) {
  console.log('Step 1: Removing existing database...')
  try {
    fs.unlinkSync(dbPath)
    console.log('✅ Existing database removed')
  } catch (error) {
    console.error('❌ Error removing database:', error)
    process.exit(1)
  }
} else {
  console.log('Step 1: No existing database found')
}

console.log('')

// Step 2: Create new database
console.log('Step 2: Creating new database...')
let db
try {
  db = new Database(dbPath)
  console.log('✅ Database created')
} catch (error) {
  console.error('❌ Error creating database:', error)
  process.exit(1)
}

console.log('')

// Step 3: Create table
console.log('Step 3: Creating table...')
try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS customer_interactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_code TEXT NOT NULL,
      keluhan TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Create indexes
  db.exec('CREATE INDEX IF NOT EXISTS idx_customer_name ON customer_interactions(customer_name)')
  db.exec('CREATE INDEX IF NOT EXISTS idx_customer_code ON customer_interactions(customer_code)')
  db.exec('CREATE INDEX IF NOT EXISTS idx_created_at ON customer_interactions(created_at)')

  console.log('✅ Table created successfully')
  console.log('✅ Indexes created successfully')
} catch (error) {
  console.error('❌ Error creating table:', error)
  db.close()
  process.exit(1)
}

console.log('')

// Step 4: Import data
console.log('Step 4: Importing data...')
try {
  const stmt = db.prepare('INSERT INTO customer_interactions (customer_name, customer_code, keluhan) VALUES (?, ?, ?)')

  let imported = 0
  let skipped = 0

  for (let i = 0; i < customerData.length; i++) {
    const record = customerData[i]

    console.log(`Importing ${i + 1}/${customerData.length}: ${record.customer_code} - ${record.customer_name.substring(0, 30)}...`)

    try {
      stmt.run(record.customer_name, record.customer_code, record.keluhan)
      imported++
      console.log(`  ✅ Success`)
    } catch (error) {
      console.error(`  ❌ Error:`, error.message)
      skipped++
    }
  }

  stmt.finalize()

  console.log('')
  console.log('========================================')
  console.log('✅ Import Completed!')
  console.log('========================================')
  console.log('Records imported:', imported)
  console.log('Records skipped:', skipped)
  console.log('Database location:', dbPath)
  console.log('')

  // Step 5: Verify data
  console.log('Step 5: Verifying data...')

  const totalRecords = db.prepare('SELECT COUNT(*) as count FROM customer_interactions').get()
  console.log('Total records in database:', totalRecords.count)

  const uniqueCustomers = db.prepare('SELECT customer_code, customer_name, COUNT(*) as count FROM customer_interactions GROUP BY customer_code').all()
  console.log('')
  console.log('Unique customers:')
  uniqueCustomers.forEach(c => {
    console.log(`  - ${c.customer_code} (${c.customer_name}): ${c.count} interactions`)
  })

  console.log('')

  // Sample data
  const samples = db.prepare('SELECT * FROM customer_interactions LIMIT 3').all()
  console.log('Sample records:')
  samples.forEach((s, i) => {
    console.log(`  ${i + 1}. ID: ${s.id}, Customer: ${s.customer_code} (${s.customer_name})`)
    console.log(`     Keluhan: ${s.keluhan.substring(0, 80)}...`)
  })

  console.log('')

  // Close database
  db.close()
  console.log('✅ Database closed')

  console.log('')
  console.log('========================================')
  console.log('✅ ALL DONE!')
  console.log('========================================')
  console.log('Database is ready to use!')
  console.log('Run API test:')
  console.log("  curl -X POST http://localhost:3000/api -H 'Content-Type: application/json' -d '{\"question\":\"Customer LAM berapa kali pernah bertanya?\"}'")
  console.log('========================================')

} catch (error) {
  console.error('❌ Error during import:', error)
  db.close()
  process.exit(1)
}
