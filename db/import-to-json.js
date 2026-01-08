const fs = require('fs')
const path = require('path')

// Sample data dari Customer Log Excel/Google Sheets
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
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', keluhan: 'Save pada saat stock opname untuk Customer KSA mengalami force close. Tapi ketika ditelusuri oleh tim operasional tidak ada force close yang terjadi melainkan data yang di save tidak tersimpan' },
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', keluhan: 'User KSA melaporkan tidak bisa login ke sistem. Error message: "Invalid credentials" padahal password sudah benar.' },
  { customer_name: 'Komunitas Sagala Aya', customer_code: 'KSA', keluhan: 'Request untuk reset password user KSA. User: ks.admin@sagalaya.com' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Permintaan untuk akses fitur advance reporting. User STR membutuhkan laporan detail bulanan.' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Data loading lambat saat mengakses dashboard overview. Perlu optimasi query database.' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Error connection timeout saat koneksi ke database server. Perlu cek setting timeout.' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Report generation error. Laporan tidak bisa digenerate karena ada null value di data field.' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Notifikasi email tidak terkirim ke user. Mohon cek konfigurasi SMTP server.' },
  { customer_name: 'Semen Tiga Roda', customer_code: 'STR', keluhan: 'Backup database gagal dijalankan otomatis. Mohon manual setup backup schedule.' }
]

const dbPath = '/home/z/my-project/db/customers.json'

console.log('========================================')
console.log('Import Customer Data to JSON Database')
console.log('========================================')
console.log('Database path:', dbPath)
console.log('Total records:', customerData.length)
console.log('')

// Create db directory if not exists
const dbDir = path.dirname(dbPath)
if (!fs.existsSync(dbDir)) {
  console.log('Creating db directory:', dbDir)
  fs.mkdirSync(dbDir, { recursive: true })
  console.log('✅ Directory created')
}

// Prepare data with timestamps
const dataWithTimestamps = customerData.map((record, index) => ({
  id: index + 1,
  ...record,
  created_at: new Date().toISOString()
}))

// Write to JSON file
console.log('Writing data to JSON database...')
try {
  const jsonContent = JSON.stringify(dataWithTimestamps, null, 2)
  fs.writeFileSync(dbPath, jsonContent, 'utf8')
  console.log('✅ Data written successfully')
  console.log(`✅ File size: ${jsonContent.length} bytes`)
} catch (error) {
  console.error('❌ Error writing database:', error)
  process.exit(1)
}

console.log('')
console.log('========================================')
console.log('✅ Import Completed!')
console.log('========================================')
console.log('Records imported:', dataWithTimestamps.length)
console.log('Database location:', dbPath)
console.log('')

// Statistics
const customerStats = {}
dataWithTimestamps.forEach(record => {
  if (!customerStats[record.customer_code]) {
    customerStats[record.customer_code] = {
      customer_name: record.customer_name,
      count: 0,
      has_keluhan: 0
    }
  }
  customerStats[record.customer_code].count++
  if (record.keluhan && record.keluhan.trim() !== '') {
    customerStats[record.customer_code].has_keluhan++
  }
})

console.log('Statistics by Customer:')
Object.entries(customerStats).sort((a, b) => b[1].count - a[1].count).forEach(([code, stats]) => {
  console.log(`  ${code} (${stats.customer_name}):`)
  console.log(`    - Total Interactions: ${stats.count}`)
  console.log(`    - Dengan Keluhan: ${stats.has_keluhan}`)
})

console.log('')
console.log('========================================')
console.log('✅ Database Ready!')
console.log('========================================')
console.log('Database file:', dbPath)
console.log('Now you can query this data via API!')
console.log('========================================')
