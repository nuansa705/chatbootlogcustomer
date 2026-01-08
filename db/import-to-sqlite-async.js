const { Database } = require('sqlite3')
const fs = require('fs')

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

console.log('========================================')
console.log('Import Customer Log ke SQLite')
console.log('========================================')
console.log('Database path:', dbPath)
console.log('Total records:', customerLogData.length)
console.log('')

// Helper function to run SQL asynchronously
function runSQL(db, sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// Helper to get data asynchronously
function getData(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

async function importData() {
  // Step 1: Create database
  console.log('Step 1: Creating database...')
  const db = new Database(dbPath)
  console.log('✅ Database created')

  try {
    // Step 2: Create table schema
    console.log('Step 2: Creating table...')
    const schemaSQL = `-- Tiket Keluhan Database Schema
-- Generated from Excel Customer Log

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
    
    await runSQL(db, schemaSQL)
    console.log('✅ Table and indexes created')

    // Step 3: Insert data
    console.log('Step 3: Inserting data...')
    let imported = 0
    let skipped = 0

    for (const record of customerLogData) {
      const insertSQL = `INSERT INTO tiket_keluhan 
        (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

      const params = [
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
      ]

      await new Promise((resolve, reject) => {
        db.run(insertSQL, params, function(err) {
          if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
              skipped++
              console.log(`  Skipping ${record.kode_tiket}: Duplicate ⚠️`)
              resolve()
            } else {
              reject(err)
            }
          } else {
            imported++
            if (imported <= 5 || imported % 5 === 0) {
              console.log(`  Importing ${imported}/${customerLogData.length}: ${record.kode_tiket} - ${record.customer_name.substring(0, 30)}... ✅`)
            }
            resolve()
          }
        })
      })
    }

    console.log('')
    console.log('========================================')
    console.log('✅ IMPORT SELESAI!')
    console.log('========================================')
    console.log('Records imported:', imported)
    console.log('Records skipped (duplicate):', skipped)
    console.log('Database location:', dbPath)
    console.log('')

    // Step 4: Verify and Statistics
    console.log('Step 4: Verifikasi dan statistik...')

    const totalRecords = await getData(db, 'SELECT COUNT(*) as count FROM tiket_keluhan')
    console.log('Total records in database:', totalRecords[0].count)

    const uniqueCustomers = await getData(db, 'SELECT kode_customer, customer, COUNT(*) as count FROM tiket_keluhan GROUP BY kode_customer')
    console.log('')
    console.log('Unique customers:')
    uniqueCustomers.forEach(c => {
      console.log(`  ${c.kode_customer} (${c.customer}): ${c.count} tickets`)
    })

    const ticketStatus = await getData(db, 'SELECT status_keluhan, COUNT(*) as count FROM tiket_keluhan GROUP BY status_keluhan')
    console.log('')
    console.log('Tickets by status:')
    ticketStatus.forEach(s => {
      console.log(`  ${s.status_keluhan}: ${s.count}`)
    })

    const platforms = await getData(db, 'SELECT platform, COUNT(*) as count FROM tiket_keluhan GROUP BY platform')
    console.log('')
    console.log('Tickets by platform:')
    platforms.forEach(p => {
      console.log(`  ${p.platform}: ${p.count}`)
    })

    // Sample data
    const samples = await getData(db, 'SELECT * FROM tiket_keluhan LIMIT 3')
    console.log('')
    console.log('Sample records (3 records pertama):')
    samples.forEach((s, i) => {
      console.log(`  ${i + 1}. [${s.kode_tiket}] ${s.tanggal} - ${s.customer} (${s.kode_customer})`)
      console.log(`     Platform: ${s.platform} | Menu: ${s.menu}`)
      console.log(`     Keluhan: ${s.keluhan_permintaan.substring(0, 80)}${s.keluhan_permintaan.length > 80 ? '...' : ''}`)
    })

    // Close database
    console.log('')
    console.log('Step 5: Closing database...')
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err)
      } else {
        console.log('✅ Database closed')
      }
    })

    console.log('')
    console.log('========================================')
    console.log('✅ ALL DONE!')
    console.log('========================================')
    console.log('Database file:', dbPath)
    console.log('Table: tiket_keluhan')
    console.log('Records:', totalRecords[0].count)
    console.log('Customers:', uniqueCustomers.length)
    console.log('Now you can query this database via API!')
    console.log('========================================')

  } catch (error) {
    console.error('❌ Error during import:', error)
    db.close()
    process.exit(1)
  }
}

// Run import
importData()
