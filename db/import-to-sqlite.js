const fs = require('fs')
const path = require('path')

// ========================================
// DATA CUSTOMER LOG DARI EXCEL
// ========================================
const customerLogData = [
  // LAM - Lycon Asia Mandiri
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '30/09/2025', kode_tiket: '#LAM09302025001', platform: 'Printer App', menu: 'QR Code Aseta Printing', jenis: 'Bug/Error', keluhan_permintaan: 'Terdapat kendala dimana saat login pada Aplikasi QR code, terdapat masalah seperti pada gambar yang dilampirkan. Isu tersebut terjadi karena perbedaan pada awal huruf username. Contohnya randi.suria@lycon.co.id dan Randi.suria@lycon.co.id', lampiran: 'Lampiran', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '30/09/2025', kode_tiket: '#LAM09302025002', platform: 'Printer App', menu: 'Upload Asset Photo', jenis: 'Bug/Error', keluhan_permintaan: 'Terdapat kendala pada saat proses upload asset photo. Foto yang diupload tidak muncul di sistem. Sudah di coba beberapa kali namun hasilnya tetap sama.', lampiran: 'Lampiran', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '01/10/2025', kode_tiket: '#LAM10012025001', platform: 'Printer App', menu: 'Input Setup Data', jenis: 'Request', keluhan_permintaan: 'Mohon info untuk fitur input setup data. Apakah ada dokumentasi atau panduan yang tersedia?', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '01/10/2025', kode_tiket: '#LAM10012025002', platform: 'Printer App', menu: 'Stock Opname Report', jenis: 'Bug/Error', keluhan_permintaan: 'Laporan untuk stock opname yang dilakukan pada tanggal kemarin. Mohon verifikasi data stock yang tersimpan.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '02/10/2025', kode_tiket: '#LAM10022025001', platform: 'Printer App', menu: 'Data Sync', jenis: 'Bug/Error', keluhan_permintaan: 'Error saat melakukan sync data antara aplikasi printer app dan sistem. Data tidak sinkron.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '02/10/2025', kode_tiket: '#LAM10022025002', platform: 'Printer App', menu: 'Dashboard', jenis: 'Bug/Error', keluhan_permintaan: 'Tampilan dashboard loading sangat lama saat pertama kali login. Lebih dari 30 detik.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '03/10/2025', kode_tiket: '#LAM10032025001', platform: 'Printer App', menu: 'QR Code Aseta Printing', jenis: 'Bug/Error', keluhan_permintaan: 'Menu QR Code Aseta Printing tidak bisa diakses. Muncul error 404.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '03/10/2025', kode_tiket: '#LAM10032025002', platform: 'Printer App', menu: 'Print QR Code', jenis: 'Bug/Error', keluhan_permintaan: 'Saat mencetak QR code, hasilnya blur/tidak jelas. Mohon dicek kualitas cetaknya.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '04/10/2025', kode_tiket: '#LAM10042025001', platform: 'Printer App', menu: 'User Management', jenis: 'Bug/Error', keluhan_permintaan: 'Aplikasi sering force close secara tiba-tiba tanpa pesan error yang jelas.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '04/10/2025', kode_tiket: '#LAM10042025002', platform: 'Printer App', menu: 'Add User', jenis: 'Request', keluhan_permintaan: 'Permintaan untuk menambah user baru. User: john.doe@lycon.co.id', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '05/10/2025', kode_tiket: '#LAM10052025001', platform: 'Printer App', menu: 'Logout', jenis: 'Bug/Error', keluhan_permintaan: 'Tidak bisa logout dari aplikasi. Tombol logout tidak merespon saat diklik.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '05/10/2025', kode_tiket: '#LAM10052025002', platform: 'Printer App', menu: 'Notification', jenis: 'Bug/Error', keluhan_permintaan: 'Notifikasi tidak muncul di aplikasi. Padahal sudah ada tiket baru yang dibuat.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '06/10/2025', kode_tiket: '#LAM10062025001', platform: 'Printer App', menu: 'Search', jenis: 'Bug/Error', keluhan_permintaan: 'Search function tidak bekerja dengan baik. Hasil pencarian tidak akurat.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '06/10/2025', kode_tiket: '#LAM10062025002', platform: 'Printer App', menu: 'Profile Update', jenis: 'Bug/Error', keluhan_permintaan: 'Profile user tidak bisa diupdate. Data kembali ke nilai awal setelah disimpan.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '07/10/2025', kode_tiket: '#LAM10072025001', platform: 'Printer App', menu: 'Export PDF', jenis: 'Bug/Error', keluhan_permintaan: 'Export to PDF error saat ingin mengunduh laporan. File PDF tidak bisa di-download.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '07/10/2025', kode_tiket: '#LAM10072025002', platform: 'Printer App', menu: 'Data Cleanup', jenis: 'Bug/Error', keluhan_permintaan: 'Terdapat duplicate data di sistem. Mohon dilakukan cleanup data duplikat.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },

  // KSA - Komunitas Sagala Aya
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', tanggal: '10/10/2025', kode_tiket: '#KSA10102025001', platform: 'Android HH CHANWAY', menu: 'Stock Opname', jenis: 'Bug/Error', keluhan_permintaan: 'Save pada saat stock opname untuk Customer KSA mengalami force close. Tapi ketika ditelusuri oleh tim operasional tidak ada force close yang terjadi melainkan data yang di save tidak tersimpan', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', tanggal: '11/10/2025', kode_tiket: '#KSA10112025001', platform: 'Android HH CHANWAY', menu: 'Login', jenis: 'Bug/Error', keluhan_permintaan: 'User KSA melaporkan tidak bisa login ke sistem. Error message: "Invalid credentials" padahal password sudah benar.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', tanggal: '12/10/2025', kode_tiket: '#KSA10122025001', platform: 'Android HH CHANWAY', menu: 'Password Reset', jenis: 'Request', keluhan_permintaan: 'Request untuk reset password user KSA. User: ks.admin@sagalaya.com', lampiran: '-', status_keluhan: 'Closed', remarks: '' },

  // STR - Semen Tiga Roda
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '15/10/2025', kode_tiket: '#STR10152025001', platform: 'Desktop', menu: 'Advanced Reporting', jenis: 'Request', keluhan_permintaan: 'Permintaan untuk akses fitur advance reporting. User STR membutuhkan laporan detail bulanan.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '15/10/2025', kode_tiket: '#STR10152025002', platform: 'Desktop', menu: 'Dashboard Overview', jenis: 'Bug/Error', keluhan_permintaan: 'Data loading lambat saat mengakses dashboard overview. Perlu optimasi query database.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '16/10/2025', kode_tiket: '#STR10162025001', platform: 'Desktop', menu: 'Database Connection', jenis: 'Bug/Error', keluhan_permintaan: 'Error connection timeout saat koneksi ke database server. Perlu cek setting timeout.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '16/10/2025', kode_tiket: '#STR10162025002', platform: 'Desktop', menu: 'Report Generation', jenis: 'Bug/Error', keluhan_permintaan: 'Report generation error. Laporan tidak bisa digenerate karena ada null value di data field.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '17/10/2025', kode_tiket: '#STR10172025001', platform: 'Desktop', menu: 'Email Notification', jenis: 'Bug/Error', keluhan_permintaan: 'Notifikasi email tidak terkirim ke user. Mohon cek konfigurasi SMTP server.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '17/10/2025', kode_tiket: '#STR10172025002', platform: 'Desktop', menu: 'Backup Schedule', jenis: 'Bug/Error', keluhan_permintaan: 'Backup database gagal dijalankan otomatis. Mohon manual setup backup schedule.', lampiran: '-', status_keluhan: 'Closed', remarks: '' }
]

const dbPath = '/home/z/my-project/db/custom.db'
const dbDir = path.dirname(dbPath)

console.log('========================================')
console.log('Import Customer Log ke SQLite')
console.log('========================================')
console.log('Database path:', dbPath)
console.log('Total records:', customerLogData.length)
console.log('')

// Step 1: Remove existing database if exists
if (fs.existsSync(dbPath)) {
  console.log('Step 1: Menghapus database lama...')
  try {
    fs.unlinkSync(dbPath)
    console.log('✅ Database lama dihapus')
  } catch (error) {
    console.error('❌ Error menghapus database:', error)
    process.exit(1)
  }
} else {
  console.log('Step 1: Tidak ada database lama')
}

// Step 2: Create db directory if not exists
if (!fs.existsSync(dbDir)) {
  console.log('Step 2: Membuat direktori database...')
  try {
    fs.mkdirSync(dbDir, { recursive: true })
    console.log('✅ Direktori database dibuat')
  } catch (error) {
    console.error('❌ Error membuat direktori:', error)
    process.exit(1)
  }
} else {
  console.log('Step 2: Direktori database sudah ada')
}

// Step 3: Create database and table
console.log('Step 3: Membuat database SQLite dan tabel tiket_keluhan...')
console.log('')

// Karena better-sqlite3 tidak bisa diinstall di environment ini,
// kita gunakan approach sederhana: create SQL file dan gunakan sqlite3 CLI

// Create schema SQL
const schemaSQL = `-- Tiket Keluhan Database Schema
-- Generated from Excel Customer Log

-- Drop existing table if exists
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tanggal ON tiket_keluhan(tanggal);
CREATE INDEX IF NOT EXISTS idx_kode_tiket ON tiket_keluhan(kode_tiket);
CREATE INDEX IF NOT EXISTS idx_kode_customer ON tiket_keluhan(kode_customer);
CREATE INDEX IF NOT EXISTS idx_status_keluhan ON tiket_keluhan(status_keluhan);
CREATE INDEX IF NOT EXISTS idx_created_at ON tiket_keluhan(created_at);
`

const schemaPath = '/home/z/my-project/db/schema.sql'

try {
  fs.writeFileSync(schemaPath, schemaSQL)
  console.log('✅ Schema SQL file created')
  console.log('📁 Schema path:', schemaPath)
} catch (error) {
  console.error('❌ Error creating schema file:', error)
  process.exit(1)
}

console.log('')
console.log('Step 4: Membuat database dan menjalankan schema...')

// Create SQL file to run with sqlite3
const sqlFilePath = '/home/z/my-project/db/insert-data.sql'

// Generate INSERT statements
let insertSQL = ''

customerLogData.forEach((record, index) => {
  const tanggal = record.tanggal || ''
  const kodeTiket = (record.kode_tiket || '').replace(/'/g, "''")
  const kodeCustomer = (record.customer_code || '').replace(/'/g, "''")
  const customer = (record.customer_name || '').replace(/'/g, "''")
  const platform = (record.platform || '').replace(/'/g, "''")
  const menu = (record.menu || '').replace(/'/g, "''")
  const jenis = (record.jenis || '').replace(/'/g, "''")
  const keluhanPermintaan = (record.keluhan_permintaan || '').replace(/'/g, "''")
  const lampiran = (record.lampiran || '').replace(/'/g, "''")
  const statusKeluhan = (record.status_keluhan || '').replace(/'/g, "''")
  const remarks = (record.remarks || '').replace(/'/g, "''")

  insertSQL += `-- Record ${index + 1}: ${kodeTiket}\n`
  insertSQL += `INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)\n`
  insertSQL += `VALUES ('${tanggal}', '${kodeTiket}', '${kodeCustomer}', '${customer}', '${platform}', '${menu}', '${jenis}', '${keluhanPermintaan}', '${lampiran}', '${statusKeluhan}', '${remarks}');\n`
  insertSQL += '\n'
})

// Combine schema and inserts
const fullSQL = schemaSQL + '\n' + insertSQL

try {
  fs.writeFileSync(sqlFilePath, fullSQL)
  console.log('✅ SQL insert file created')
  console.log('📁 SQL file path:', sqlFilePath)
  console.log('📊 Total INSERT statements:', customerLogData.length)
} catch (error) {
  console.error('❌ Error creating SQL file:', error)
  process.exit(1)
}

console.log('')
console.log('========================================')
console.log('📋 SQL Files Created!')
console.log('========================================')
console.log('📁 Schema:', schemaPath)
console.log('📁 Insert:', sqlFilePath)
console.log('')

console.log('Step 5: Menjalankan SQLite untuk membuat database...')
console.log('')

// Try to use sqlite3 package first
const { Database } = require('sqlite3')

try {
  console.log('Menggunakan sqlite3...')
  const db = new Database(dbPath)
  
  // Run schema
  db.exec(schemaSQL)
  console.log('✅ Schema executed')
  
  // Insert data
  const stmt = db.prepare('INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
  
  let imported = 0
  let skipped = 0

  for (const record of customerLogData) {
    try {
      stmt.run(
        record.tanggal,
        record.kode_tiket,
        record.customer_code,
        record.customer_name,
        record.platform,
        record.menu,
        record.jenis || 'Bug/Error',
        record.keluhan_permintaan,
        record.lampiran || '-',
        record.status_keluhan,
        record.remarks || ''
      )
      imported++
      
      if (imported <= 5 || imported % 5 === 0) {
        console.log(`  Importing ${imported}/${customerLogData.length}: ${record.kode_tiket} - ${record.customer_name.substring(0, 30)}... ✅`)
      }
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        console.log(`  Skipping ${record.kode_tiket}: Duplicate ⚠️`)
        skipped++
      } else {
        console.error(`  Error inserting ${record.kode_tiket}:`, error.message)
      }
    }
  }

  stmt.finalize()
  db.close()

  console.log('')
  console.log('========================================')
  console.log('✅ IMPORT SELESAI!')
  console.log('========================================')
  console.log('Database path:', dbPath)
  console.log('Records imported:', imported)
  console.log('Records skipped (duplicate):', skipped)
  console.log('Total records in data:', customerLogData.length)
  console.log('')

  // Verify
  console.log('Step 6: Verifikasi database...')
  const db2 = new Database(dbPath)
  
  const totalRecords = db2.prepare('SELECT COUNT(*) as count FROM tiket_keluhan').get()
  console.log('Total records in database:', totalRecords ? totalRecords.count : 0)

  const uniqueCustomers = db2.prepare('SELECT kode_customer, customer, COUNT(*) as count FROM tiket_keluhan GROUP BY kode_customer').all()
  console.log('')
  console.log('Unique customers:')
  if (uniqueCustomers && Array.isArray(uniqueCustomers)) {
    uniqueCustomers.forEach(c => {
      console.log(`  ${c.kode_customer} (${c.customer}): ${c.count} tickets`)
    })
  }

  const ticketStatus = db2.prepare('SELECT status_keluhan, COUNT(*) as count FROM tiket_keluhan GROUP BY status_keluhan').all()
  console.log('')
  console.log('Tickets by status:')
  if (ticketStatus && Array.isArray(ticketStatus)) {
    ticketStatus.forEach(s => {
      console.log(`  ${s.status_keluhan}: ${s.count}`)
    })
  }

  // Sample data
  const samples = db2.prepare('SELECT * FROM tiket_keluhan LIMIT 3').all()
  console.log('')
  console.log('Sample records:')
  samples.forEach((s, i) => {
    console.log(`  ${i + 1}. [${s.kode_tiket}] ${s.tanggal} - ${s.customer} (${s.kode_customer})`)
    console.log(`     Platform: ${s.platform} | Menu: ${s.menu}`)
    console.log(`     Keluhan: ${s.keluhan_permintaan.substring(0, 60)}...`)
  })

  db2.close()
  console.log('✅ Database closed')

  console.log('')
  console.log('========================================')
  console.log('✅ DATABASE READY!')
  console.log('========================================')
  console.log('Database file:', dbPath)
  console.log('Table: tiket_keluhan')
  console.log('Total records:', totalRecords.count)
  console.log('')

  console.log('Now you can query this database via API!')
  console.log('Example query:')
  console.log('  curl -X POST http://localhost:3000/api -H "Content-Type: application/json" -d \'{"question":"Customer LAM ringkasan"}\'')
  console.log('========================================')

} catch (error) {
  console.error('❌ Error dengan better-sqlite3:', error.message)
  console.log('')
  console.log('Trying alternative approach...')
  console.log('SQL files generated at:')
  console.log('  - Schema:', schemaPath)
  console.log('  - Insert:', sqlFilePath)
  console.log('')
  console.log('To run manually (if sqlite3 CLI is available):')
  console.log(`  sqlite3 ${dbPath} < ${schemaPath}`)
  console.log(`  sqlite3 ${dbPath} < ${sqlFilePath}`)
  process.exit(1)
}
