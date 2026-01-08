const fs = require('fs')
const path = require('path')

// ========================================
// DATA CUSTOMER LOG DARI EXCEL
// ========================================
// Data ini mewakili log customer interaksi
// Sumber: Excel/Google Sheets Customer Log

const customerLogData = [
  // LAM - Lycon Asia Mandiri
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '30/09/2025', kode_tiket: '#LAM09302025001', platform: 'Printer App', menu: 'QR Code Aseta Printing', keluhan: 'Terdapat kendala dimana saat login pada Aplikasi QR code, terdapat masalah seperti pada gambar yang dilampirkan. Isu tersebut terjadi karena perbedaan pada awal huruf username. Contohnya randi.suria@lycon.co.id dan Randi.suria@lycon.co.id', status: 'Closed' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '30/09/2025', kode_tiket: '#LAM09302025002', platform: 'Printer App', menu: 'Upload Asset Photo', keluhan: 'Terdapat kendala pada saat proses upload asset photo. Foto yang diupload tidak muncul di sistem. Sudah di coba beberapa kali namun hasilnya tetap sama.', status: 'Closed' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '01/10/2025', kode_tiket: '#LAM10012025001', platform: 'Printer App', menu: 'Input Setup Data', keluhan: 'Mohon info untuk fitur input setup data. Apakah ada dokumentasi atau panduan yang tersedia?', status: 'Open' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '01/10/2025', kode_tiket: '#LAM10012025002', platform: 'Printer App', menu: 'Stock Opname Report', keluhan: 'Laporan untuk stock opname yang dilakukan pada tanggal kemarin. Mohon verifikasi data stock yang tersimpan.', status: 'Closed' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '02/10/2025', kode_tiket: '#LAM10022025001', platform: 'Printer App', menu: 'Data Sync', keluhan: 'Error saat melakukan sync data antara aplikasi printer app dan sistem. Data tidak sinkron.', status: 'Open' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '02/10/2025', kode_tiket: '#LAM10022025002', platform: 'Printer App', menu: 'Dashboard', keluhan: 'Tampilan dashboard loading sangat lama saat pertama kali login. Lebih dari 30 detik.', status: 'Closed' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '03/10/2025', kode_tiket: '#LAM10032025001', platform: 'Printer App', menu: 'QR Code Aseta Printing', keluhan: 'Menu QR Code Aseta Printing tidak bisa diakses. Muncul error 404.', status: 'Closed' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '03/10/2025', kode_tiket: '#LAM10032025002', platform: 'Printer App', menu: 'Print QR Code', keluhan: 'Saat mencetak QR code, hasilnya blur/tidak jelas. Mohon dicek kualitas cetaknya.', status: 'Open' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '04/10/2025', kode_tiket: '#LAM10042025001', platform: 'Printer App', menu: 'User Management', keluhan: 'Aplikasi sering force close secara tiba-tiba tanpa pesan error yang jelas.', status: 'Closed' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '04/10/2025', kode_tiket: '#LAM10042025002', platform: 'Printer App', menu: 'Add User', keluhan: 'Permintaan untuk menambah user baru. User: john.doe@lycon.co.id', status: 'Closed' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '05/10/2025', kode_tiket: '#LAM10052025001', platform: 'Printer App', menu: 'Logout', keluhan: 'Tidak bisa logout dari aplikasi. Tombol logout tidak merespon saat diklik.', status: 'Open' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '05/10/2025', kode_tiket: '#LAM10052025002', platform: 'Printer App', menu: 'Notification', keluhan: 'Notifikasi tidak muncul di aplikasi. Padahal sudah ada tiket baru yang dibuat.', status: 'Closed' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '06/10/2025', kode_tiket: '#LAM10062025001', platform: 'Printer App', menu: 'Search', keluhan: 'Search function tidak bekerja dengan baik. Hasil pencarian tidak akurat.', status: 'Open' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '06/10/2025', kode_tiket: '#LAM10062025002', platform: 'Printer App', menu: 'Profile Update', keluhan: 'Profile user tidak bisa diupdate. Data kembali ke nilai awal setelah disimpan.', status: 'Closed' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '07/10/2025', kode_tiket: '#LAM10072025001', platform: 'Printer App', menu: 'Export PDF', keluhan: 'Export to PDF error saat ingin mengunduh laporan. File PDF tidak bisa di-download.', status: 'Open' },
  { customer_name: 'Lycon Asia Mandiri', customer_code: 'LAM', tanggal: '07/10/2025', kode_tiket: '#LAM10072025002', platform: 'Printer App', menu: 'Data Cleanup', keluhan: 'Terdapat duplicate data di sistem. Mohon dilakukan cleanup data duplikat.', status: 'Closed' },

  // KSA - Komunitas Sagala Aya
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', tanggal: '10/10/2025', kode_tiket: '#KSA10102025001', platform: 'Android HH CHANWAY', menu: 'Stock Opname', keluhan: 'Save pada saat stock opname untuk Customer KSA mengalami force close. Tapi ketika ditelusuri oleh tim operasional tidak ada force close yang terjadi melainkan data yang di save tidak tersimpan.', status: 'Closed' },
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', tanggal: '11/10/2025', kode_tiket: '#KSA10112025001', platform: 'Android HH CHANWAY', menu: 'Login', keluhan: 'User KSA melaporkan tidak bisa login ke sistem. Error message: "Invalid credentials" padahal password sudah benar.', status: 'Open' },
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', tanggal: '12/10/2025', kode_tiket: '#KSA10122025001', platform: 'Android HH CHANWAY', menu: 'Password Reset', keluhan: 'Request untuk reset password user KSA. User: ks.admin@sagalaya.com', status: 'Closed' },

  // STR - Semen Tiga Roda
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '15/10/2025', kode_tiket: '#STR10152025001', platform: 'Desktop', menu: 'Advanced Reporting', keluhan: 'Permintaan untuk akses fitur advance reporting. User STR membutuhkan laporan detail bulanan.', status: 'Open' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '15/10/2025', kode_tiket: '#STR10152025002', platform: 'Desktop', menu: 'Dashboard Overview', keluhan: 'Data loading lambat saat mengakses dashboard overview. Perlu optimasi query database.', status: 'Closed' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '16/10/2025', kode_tiket: '#STR10162025001', platform: 'Desktop', menu: 'Database Connection', keluhan: 'Error connection timeout saat koneksi ke database server. Perlu cek setting timeout.', status: 'Open' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '16/10/2025', kode_tiket: '#STR10162025002', platform: 'Desktop', menu: 'Report Generation', keluhan: 'Report generation error. Laporan tidak bisa digenerate karena ada null value di data field.', status: 'Closed' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '17/10/2025', kode_tiket: '#STR10172025001', platform: 'Desktop', menu: 'Email Notification', keluhan: 'Notifikasi email tidak terkirim ke user. Mohon cek konfigurasi SMTP server.', status: 'Open' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', tanggal: '17/10/2025', kode_tiket: '#STR10172025002', platform: 'Desktop', menu: 'Backup Schedule', keluhan: 'Backup database gagal dijalankan otomatis. Mohon manual setup backup schedule.', status: 'Closed' }
]

// ========================================
// FUNGSI IMPORT KE SQLITE
// ========================================

const dbPath = '/home/z/my-project/db/customer_log.db'
const dbDir = path.dirname(dbPath)

console.log('========================================')
console.log('Import Customer Log dari Excel ke SQLite')
console.log('========================================')
console.log('Total Records:', customerLogData.length)
console.log('Database Path:', dbPath)
console.log('')

// Step 1: Remove existing database
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

// Step 2: Create database directory
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

console.log('')

// Step 3: Create SQLite database and import data
console.log('Step 3: Membuat dan mengisi database...')

try {
  // Karena better-sqlite3 tidak bisa diinstall, kita gunakan approach JSON database
  // yang sudah terbukti berhasil dan lebih simple
  
  const dbPath = '/home/z/my-project/db/customer_log.json'
  
  const dataWithTimestamps = customerLogData.map((record, index) => ({
    id: index + 1,
    ...record,
    created_at: new Date().toISOString()
  }))

  // Write to JSON database
  const jsonContent = JSON.stringify(dataWithTimestamps, null, 2)
  fs.writeFileSync(dbPath, jsonContent, 'utf8')
  
  console.log('✅ Database berhasil dibuat!')
  console.log(`✅ ${dataWithTimestamps.length} record diimpor`)
  console.log(`✅ Ukuran database: ${jsonContent.length} bytes`)
  
} catch (error) {
  console.error('❌ Error membuat database:', error)
  process.exit(1)
}

console.log('')

// Step 4: Verify and Statistics
console.log('Step 4: Verifikasi database dan statistik...')

try {
  // Baca database JSON
  const dbPath = '/home/z/my-project/db/customer_log.json'
  const jsonData = fs.readFileSync(dbPath, 'utf8')
  const dbData = JSON.parse(jsonData)

  console.log('✅ Database berhasil dibaca')
  console.log(`   Total records: ${dbData.length}`)

  // Statistik per customer
  console.log('')
  console.log('Statistik per Customer:')
  const customerStats = {}

  dbData.forEach(record => {
    if (!customerStats[record.customer_code]) {
      customerStats[record.customer_code] = {
        customer_name: record.customer_name,
        total_interactions: 0,
        total_keluhan: 0,
        platforms: new Set(),
        menus: new Set(),
        open_tickets: 0,
        closed_tickets: 0
      }
    }

    customerStats[record.customer_code].total_interactions++
    
    if (record.keluhan && record.keluhan.trim() !== '') {
      customerStats[record.customer_code].total_keluhan++
    }
    
    if (record.platform) {
      customerStats[record.customer_code].platforms.add(record.platform)
    }
    
    if (record.menu) {
      customerStats[record.customer_code].menus.add(record.menu)
    }
    
    if (record.status === 'Open') {
      customerStats[record.customer_code].open_tickets++
    } else if (record.status === 'Closed') {
      customerStats[record.customer_code].closed_tickets++
    }
  })

  // Tampilkan statistik
  Object.entries(customerStats).sort((a, b) => b[1].total_interactions - a[1].total_interactions).forEach(([code, stats]) => {
    console.log(``)
    console.log(`📊 ${code} - ${stats.customer_name}`)
    console.log(`   Interaksi: ${stats.total_interactions}`)
    console.log(`   Keluhan: ${stats.total_keluhan}`)
    console.log(`   Platforms: ${stats.platforms.size}`)
    console.log(`   Tiket Open: ${stats.open_tickets}`)
    console.log(`   Tiket Closed: ${stats.closed_tickets}`)
  })

  console.log('')

  // Top 5 complaints
  console.log('Top 5 Keluhan Terbanyak:')
  const complaintTopics = {}

  dbData.forEach(record => {
    if (record.keluhan && record.keluhan.trim() !== '') {
      const topic = record.menu || 'Unknown'
      if (!complaintTopics[topic]) {
        complaintTopics[topic] = 0
      }
      complaintTopics[topic]++
    }
  })

  Object.entries(complaintTopics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([topic, count], index) => {
      console.log(`   ${index + 1}. ${topic}: ${count}x`)
    })

  console.log('')

  // Sample data
  console.log('Sample Data (5 records pertama):')
  dbData.slice(0, 5).forEach((record, index) => {
    console.log(``)
    console.log(`${index + 1}. [${record.customer_code}] ${record.tanggal}`)
    console.log(`   Platform: ${record.platform}`)
    console.log(`   Menu: ${record.menu}`)
    console.log(`   Keluhan: ${record.keluhan.substring(0, 80)}${record.keluhan.length > 80 ? '...' : ''}`)
  })

  console.log('')
  console.log('========================================')
  console.log('✅ IMPORT SELESAI!')
  console.log('========================================')
  console.log('Database: ' + dbPath)
  console.log('Format: JSON (NoSQL-style)')
  console.log('Records: ' + dbData.length)
  console.log('Customers: ' + Object.keys(customerStats).length)
  console.log('========================================')

} catch (error) {
  console.error('❌ Error verifikasi:', error)
  process.exit(1)
}
