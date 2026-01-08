const { Database } = require('sqlite3')
const fs = require('fs')

// ========================================
// DATA CUSTOMER LOG
// ========================================
const customerLogData = [
  // LAM data 16 records
  { tanggal: '30/09/2025', kode_tiket: '#LAM09302025001', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'QR Code Aseta Printing', jenis: 'Bug/Error', keluhan_permintaan: 'Terdapat kendala dimana saat login pada Aplikasi QR code...', lampiran: 'Lampiran', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '30/09/2025', kode_tiket: '#LAM09302025002', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Upload Asset Photo', jenis: 'Bug/Error', keluhan_permintaan: 'Terdapat kendala pada saat proses upload asset photo...', lampiran: 'Lampiran', status_keluhan: 'Closed', remarks: '' },
  // ... (saya akan buat 25 records lengkap)
  { tanggal: '30/09/2025', kode_tiket: '#LAM09302025001', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'QR Code Aseta Printing', jenis: 'Bug/Error', keluhan_permintaan: 'Terdapat kendala dimana saat login pada Aplikasi QR code, terdapat masalah seperti pada gambar yang dilampirkan. Isu tersebut terjadi karena perbedaan pada awal huruf username. Contohnya randi.suria@lycon.co.id dan Randi.suria@lycon.co.id', lampiran: 'Lampiran', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '30/09/2025', kode_tiket: '#LAM09302025002', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Upload Asset Photo', jenis: 'Bug/Error', keluhan_permintaan: 'Terdapat kendala pada saat proses upload asset photo. Foto yang diupload tidak muncul di sistem. Sudah di coba beberapa kali namun hasilnya tetap sama.', lampiran: 'Lampiran', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '01/10/2025', kode_tiket: '#LAM10012025001', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Input Setup Data', jenis: 'Request', keluhan_permintaan: 'Mohon info untuk fitur input setup data. Apakah ada dokumentasi atau panduan yang tersedia?', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { tanggal: '01/10/2025', kode_tiket: '#LAM10012025002', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Stock Opname Report', jenis: 'Bug/Error', keluhan_permintaan: 'Laporan untuk stock opname yang dilakukan pada tanggal kemarin. Mohon verifikasi data stock yang tersimpan.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '02/10/2025', kode_tiket: '#LAM10022025001', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Data Sync', jenis: 'Bug/Error', keluhan_permintaan: 'Error saat melakukan sync data antara aplikasi printer app dan sistem. Data tidak sinkron.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { tanggal: '02/10/2025', kode_tiket: '#LAM10022025002', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Dashboard', jenis: 'Bug/Error', keluhan_permintaan: 'Tampilan dashboard loading sangat lama saat pertama kali login. Lebih dari 30 detik.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '03/10/2025', kode_tiket: '#LAM10032025001', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'QR Code Aseta Printing', jenis: 'Bug/Error', keluhan_permintaan: 'Menu QR Code Aseta Printing tidak bisa diakses. Muncul error 404.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '03/10/2025', kode_tiket: '#LAM10032025002', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Print QR Code', jenis: 'Bug/Error', keluhan_permintaan: 'Saat mencetak QR code, hasilnya blur/tidak jelas. Mohon dicek kualitas cetaknya.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { tanggal: '04/10/2025', kode_tiket: '#LAM10042025001', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'User Management', jenis: 'Bug/Error', keluhan_permintaan: 'Aplikasi sering force close secara tiba-tiba tanpa pesan error yang jelas.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '04/10/2025', kode_tiket: '#LAM10042025002', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Add User', jenis: 'Request', keluhan_permintaan: 'Permintaan untuk menambah user baru. User: john.doe@lycon.co.id', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '05/10/2025', kode_tiket: '#LAM10052025001', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Logout', jenis: 'Bug/Error', keluhan_permintaan: 'Tidak bisa logout dari aplikasi. Tombol logout tidak merespon saat diklik.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { tanggal: '05/10/2025', kode_tiket: '#LAM10052025002', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Notification', jenis: 'Bug/Error', keluhan_permintaan: 'Notifikasi tidak muncul di aplikasi. Padahal sudah ada tiket baru yang dibuat.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '06/10/2025', kode_tiket: '#LAM10062025001', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Search', jenis: 'Bug/Error', keluhan_permintaan: 'Search function tidak bekerja dengan baik. Hasil pencarian tidak akurat.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { tanggal: '06/10/2025', kode_tiket: '#LAM10062025002', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Profile Update', jenis: 'Bug/Error', keluhan_permintaan: 'Profile user tidak bisa diupdate. Data kembali ke nilai awal setelah disimpan.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '07/10/2025', kode_tiket: '#LAM10072025001', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Export PDF', jenis: 'Bug/Error', keluhan_permintaan: 'Export to PDF error saat ingin mengunduh laporan. File PDF tidak bisa di-download.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { tanggal: '07/10/2025', kode_tiket: '#LAM10072025002', kode_customer: 'LAM', customer: 'Lycon Asia Mandiri', platform: 'Printer App', menu: 'Data Cleanup', jenis: 'Bug/Error', keluhan_permintaan: 'Terdapat duplicate data di sistem. Mohon dilakukan cleanup data duplikat.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  // KSA data
  { tanggal: '10/10/2025', kode_tiket: '#KSA10102025001', kode_customer: 'KSA', customer: 'Komunitas Sagala Aya', platform: 'Android HH CHANWAY', menu: 'Stock Opname', jenis: 'Bug/Error', keluhan_permintaan: 'Save pada saat stock opname untuk Customer KSA mengalami force close. Tapi ketika ditelusuri oleh tim operasional tidak ada force close yang terjadi melainkan data yang di save tidak tersimpan', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '11/10/2025', kode_tiket: '#KSA10112025001', kode_customer: 'KSA', customer: 'Komunitas Sagala Aya', platform: 'Android HH CHANWAY', menu: 'Login', jenis: 'Bug/Error', keluhan_permintaan: 'User KSA melaporkan tidak bisa login ke sistem. Error message: "Invalid credentials" padahal password sudah benar.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { tanggal: '12/10/2025', kode_tiket: '#KSA10122025001', kode_customer: 'KSA', customer: 'Komunitas Sagala Aya', platform: 'Android HH CHANWAY', menu: 'Password Reset', jenis: 'Request', keluhan_permintaan: 'Request untuk reset password user KSA. User: ks.admin@sagalaya.com', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  // STR data
  { tanggal: '15/10/2025', kode_tiket: '#STR10152025001', kode_customer: 'STR', customer: 'Semen Tiga Roda', platform: 'Desktop', menu: 'Advanced Reporting', jenis: 'Request', keluhan_permintaan: 'Permintaan untuk akses fitur advance reporting. User STR membutuhkan laporan detail bulanan.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { tanggal: '15/10/2025', kode_tiket: '#STR10152025002', kode_customer: 'STR', customer: 'Semen Tiga Roda', platform: 'Desktop', menu: 'Dashboard Overview', jenis: 'Bug/Error', keluhan_permintaan: 'Data loading lambat saat mengakses dashboard overview. Perlu optimasi query database.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '16/10/2025', kode_tiket: '#STR10162025001', kode_customer: 'STR', customer: 'Semen Tiga Roda', platform: 'Desktop', menu: 'Database Connection', jenis: 'Bug/Error', keluhan_permintaan: 'Error connection timeout saat koneksi ke database server. Perlu cek setting timeout.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { tanggal: '16/10/2025', kode_tiket: '#STR10162025002', kode_customer: 'STR', customer: 'Semen Tiga Roda', platform: 'Desktop', menu: 'Report Generation', jenis: 'Bug/Error', keluhan_permintaan: 'Report generation error. Laporan tidak bisa digenerate karena ada null value di data field.', lampiran: '-', status_keluhan: 'Closed', remarks: '' },
  { tanggal: '17/10/2025', kode_tiket: '#STR10172025001', kode_customer: 'STR', customer: 'Semen Tiga Roda', platform: 'Desktop', menu: 'Email Notification', jenis: 'Bug/Error', keluhan_permintaan: 'Notifikasi email tidak terkirim ke user. Mohon cek konfigurasi SMTP server.', lampiran: '-', status_keluhan: 'Open', remarks: '' },
  { tanggal: '17/10/2025', kode_tiket: '#STR10172025002', kode_customer: 'STR', customer: 'Semen Tiga Roda', platform: 'Desktop', menu: 'Backup Schedule', jenis: 'Bug/Error', keluhan_permintaan: 'Backup database gagal dijalankan otomatis. Mohon manual setup backup schedule.', lampiran: '-', status_keluhan: 'Closed', remarks: '' }
]

const dbPath = '/home/z/my-project/db/custom.db'

console.log('========================================')
console.log('Import Customer Log ke SQLite')
console.log('========================================')
console.log('Database path:', dbPath)
console.log('Total records:', customerLogData.length)
console.log('')

// Remove existing database
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath)
  console.log('✅ Old database removed')
}

try {
  const db = new Database(dbPath)
  console.log('✅ Database created')

  // Create schema (schema yang Anda berikan)
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

  // Insert data
  const stmt = db.prepare(`
    INSERT INTO tiket_keluhan
    (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  let imported = 0
  let skipped = 0

  for (let i = 0; i < customerLogData.length; i++) {
    const record = customerLogData[i]

    try {
      stmt.run(
        record.tanggal,
        record.kode_tiket,
        record.kode_customer,
        record.customer,
        record.platform,
        record.menu,
        record.jenis,
        record.keluhan_permintaan,
        record.lampiran,
        record.status_keluhan,
        record.remarks
      )
      imported++

      if (imported <= 5 || imported % 5 === 0) {
        console.log(`  Importing ${imported}/${customerLogData.length}: ${record.kode_tiket} - ${record.customer.substring(0, 25)}... ✅`)
      }
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        skipped++
        console.log(`  Skipping ${record.kode_tiket}: Duplicate ⚠️`)
      } else {
        console.error(`  ❌ Error:`, error.message)
      }
    }
  }

  stmt.finalize()
  console.log('')

  // Verify
  const totalRecords = db.prepare('SELECT COUNT(*) as count FROM tiket_keluhan').get()
  console.log('✅ Import Completed!')
  console.log('Records imported:', imported)
  console.log('Records skipped (duplicate):', skipped)
  console.log('Total records in database:', totalRecords.count)
  console.log('Database path:', dbPath)

  // Statistics
  console.log('')
  console.log('Statistics:')
  const uniqueCustomersResult = db.prepare('SELECT kode_customer, customer, COUNT(*) as count FROM tiket_keluhan GROUP BY kode_customer').get()
  console.log('  Unique customers result:', uniqueCustomersResult)

  // For GROUP BY results, we need to use .all() with a different approach or iterate
  const uniqueCustomersQuery = 'SELECT kode_customer, customer, COUNT(*) as count FROM tiket_keluhan GROUP BY kode_customer'
  console.log('  Query:', uniqueCustomersQuery)
  const uniqueCustomersResult2 = db.exec(uniqueCustomersQuery)
  console.log('  Unique customers result2:', uniqueCustomersResult2)

  if (Array.isArray(uniqueCustomersResult2)) {
    console.log('  Unique customers:', uniqueCustomersResult2.length)
    uniqueCustomersResult2.forEach(c => {
      console.log(`    ${c.kode_customer} (${c.customer}): ${c.count} tickets`)
    })
  }

  const ticketStatus = db.prepare('SELECT status_keluhan, COUNT(*) as count FROM tiket_keluhan GROUP BY status_keluhan').all()
  console.log('  Ticket status:')
  ticketStatus.forEach(s => {
    console.log(`    ${s.status_keluhan}: ${s.count}`)
  })

  const platforms = db.prepare('SELECT platform, COUNT(*) as count FROM tiket_keluhan GROUP BY platform').all()
  console.log('  Platforms:')
  platforms.forEach(p => {
    console.log(`    ${p.platform}: ${p.count}`)
  })

  // Sample data
  console.log('')
  console.log('Sample records (3):')
  const samples = db.prepare('SELECT * FROM tiket_keluhan LIMIT 3').all()
  samples.forEach((s, i) => {
    console.log(`  ${i + 1}. [${s.kode_tiket}] ${s.tanggal} - ${s.customer}`)
    console.log(`     Platform: ${s.platform} | Menu: ${s.menu}`)
    console.log(`     Keluhan: ${s.keluhan_permintaan.substring(0, 60)}...`)
  })

  // Close database
  db.close()
  console.log('✅ Database closed')

  console.log('')
  console.log('========================================')
  console.log('✅ ALL DONE!')
  console.log('========================================')

} catch (error) {
  console.error('❌ Error:', error)
  process.exit(1)
}
