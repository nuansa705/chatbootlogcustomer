-- Tiket Keluhan Database Schema
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

-- Record 1: #LAM09302025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('30/09/2025', '#LAM09302025001', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'QR Code Aseta Printing', 'Bug/Error', 'Terdapat kendala dimana saat login pada Aplikasi QR code, terdapat masalah seperti pada gambar yang dilampirkan. Isu tersebut terjadi karena perbedaan pada awal huruf username. Contohnya randi.suria@lycon.co.id dan Randi.suria@lycon.co.id', 'Lampiran', 'Closed', '');

-- Record 2: #LAM09302025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('30/09/2025', '#LAM09302025002', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Upload Asset Photo', 'Bug/Error', 'Terdapat kendala pada saat proses upload asset photo. Foto yang diupload tidak muncul di sistem. Sudah di coba beberapa kali namun hasilnya tetap sama.', 'Lampiran', 'Closed', '');

-- Record 3: #LAM10012025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('01/10/2025', '#LAM10012025001', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Input Setup Data', 'Request', 'Mohon info untuk fitur input setup data. Apakah ada dokumentasi atau panduan yang tersedia?', '-', 'Open', '');

-- Record 4: #LAM10012025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('01/10/2025', '#LAM10012025002', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Stock Opname Report', 'Bug/Error', 'Laporan untuk stock opname yang dilakukan pada tanggal kemarin. Mohon verifikasi data stock yang tersimpan.', '-', 'Closed', '');

-- Record 5: #LAM10022025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('02/10/2025', '#LAM10022025001', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Data Sync', 'Bug/Error', 'Error saat melakukan sync data antara aplikasi printer app dan sistem. Data tidak sinkron.', '-', 'Open', '');

-- Record 6: #LAM10022025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('02/10/2025', '#LAM10022025002', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Dashboard', 'Bug/Error', 'Tampilan dashboard loading sangat lama saat pertama kali login. Lebih dari 30 detik.', '-', 'Closed', '');

-- Record 7: #LAM10032025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('03/10/2025', '#LAM10032025001', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'QR Code Aseta Printing', 'Bug/Error', 'Menu QR Code Aseta Printing tidak bisa diakses. Muncul error 404.', '-', 'Closed', '');

-- Record 8: #LAM10032025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('03/10/2025', '#LAM10032025002', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Print QR Code', 'Bug/Error', 'Saat mencetak QR code, hasilnya blur/tidak jelas. Mohon dicek kualitas cetaknya.', '-', 'Open', '');

-- Record 9: #LAM10042025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('04/10/2025', '#LAM10042025001', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'User Management', 'Bug/Error', 'Aplikasi sering force close secara tiba-tiba tanpa pesan error yang jelas.', '-', 'Closed', '');

-- Record 10: #LAM10042025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('04/10/2025', '#LAM10042025002', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Add User', 'Request', 'Permintaan untuk menambah user baru. User: john.doe@lycon.co.id', '-', 'Closed', '');

-- Record 11: #LAM10052025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('05/10/2025', '#LAM10052025001', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Logout', 'Bug/Error', 'Tidak bisa logout dari aplikasi. Tombol logout tidak merespon saat diklik.', '-', 'Open', '');

-- Record 12: #LAM10052025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('05/10/2025', '#LAM10052025002', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Notification', 'Bug/Error', 'Notifikasi tidak muncul di aplikasi. Padahal sudah ada tiket baru yang dibuat.', '-', 'Closed', '');

-- Record 13: #LAM10062025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('06/10/2025', '#LAM10062025001', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Search', 'Bug/Error', 'Search function tidak bekerja dengan baik. Hasil pencarian tidak akurat.', '-', 'Open', '');

-- Record 14: #LAM10062025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('06/10/2025', '#LAM10062025002', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Profile Update', 'Bug/Error', 'Profile user tidak bisa diupdate. Data kembali ke nilai awal setelah disimpan.', '-', 'Closed', '');

-- Record 15: #LAM10072025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('07/10/2025', '#LAM10072025001', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Export PDF', 'Bug/Error', 'Export to PDF error saat ingin mengunduh laporan. File PDF tidak bisa di-download.', '-', 'Open', '');

-- Record 16: #LAM10072025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('07/10/2025', '#LAM10072025002', 'LAM', 'Lycon Asia Mandiri', 'Printer App', 'Data Cleanup', 'Bug/Error', 'Terdapat duplicate data di sistem. Mohon dilakukan cleanup data duplikat.', '-', 'Closed', '');

-- Record 17: #KSA10102025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('10/10/2025', '#KSA10102025001', 'KSA', 'Komunitas Sagala Aya', 'Android HH CHANWAY', 'Stock Opname', 'Bug/Error', 'Save pada saat stock opname untuk Customer KSA mengalami force close. Tapi ketika ditelusuri oleh tim operasional tidak ada force close yang terjadi melainkan data yang di save tidak tersimpan', '-', 'Closed', '');

-- Record 18: #KSA10112025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('11/10/2025', '#KSA10112025001', 'KSA', 'Komunitas Sagala Aya', 'Android HH CHANWAY', 'Login', 'Bug/Error', 'User KSA melaporkan tidak bisa login ke sistem. Error message: "Invalid credentials" padahal password sudah benar.', '-', 'Open', '');

-- Record 19: #KSA10122025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('12/10/2025', '#KSA10122025001', 'KSA', 'Komunitas Sagala Aya', 'Android HH CHANWAY', 'Password Reset', 'Request', 'Request untuk reset password user KSA. User: ks.admin@sagalaya.com', '-', 'Closed', '');

-- Record 20: #STR10152025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('15/10/2025', '#STR10152025001', 'STR', 'Semen Tiga Roda', 'Desktop', 'Advanced Reporting', 'Request', 'Permintaan untuk akses fitur advance reporting. User STR membutuhkan laporan detail bulanan.', '-', 'Open', '');

-- Record 21: #STR10152025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('15/10/2025', '#STR10152025002', 'STR', 'Semen Tiga Roda', 'Desktop', 'Dashboard Overview', 'Bug/Error', 'Data loading lambat saat mengakses dashboard overview. Perlu optimasi query database.', '-', 'Closed', '');

-- Record 22: #STR10162025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('16/10/2025', '#STR10162025001', 'STR', 'Semen Tiga Roda', 'Desktop', 'Database Connection', 'Bug/Error', 'Error connection timeout saat koneksi ke database server. Perlu cek setting timeout.', '-', 'Open', '');

-- Record 23: #STR10162025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('16/10/2025', '#STR10162025002', 'STR', 'Semen Tiga Roda', 'Desktop', 'Report Generation', 'Bug/Error', 'Report generation error. Laporan tidak bisa digenerate karena ada null value di data field.', '-', 'Closed', '');

-- Record 24: #STR10172025001
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('17/10/2025', '#STR10172025001', 'STR', 'Semen Tiga Roda', 'Desktop', 'Email Notification', 'Bug/Error', 'Notifikasi email tidak terkirim ke user. Mohon cek konfigurasi SMTP server.', '-', 'Open', '');

-- Record 25: #STR10172025002
INSERT INTO tiket_keluhan (tanggal, kode_tiket, kode_customer, customer, platform, menu, jenis, keluhan_permintaan, lampiran, status_keluhan, remarks)
VALUES ('17/10/2025', '#STR10172025002', 'STR', 'Semen Tiga Roda', 'Desktop', 'Backup Schedule', 'Bug/Error', 'Backup database gagal dijalankan otomatis. Mohon manual setup backup schedule.', '-', 'Closed', '');

