# Setup Google Sheets API Integration

## Prasyarat

1. **Google Cloud Project**
   - Buat project baru di Google Cloud Console
   - Enable Google Sheets API
   - Create Service Account

2. **Google Spreadsheet**
   - Buka spreadsheet: https://docs.google.com/spreadsheets/d/1wFvF0dH_kkN4uB4GVuJZozvSzVpdr59TlJJH2iTHH-E/edit
   - Share dengan Service Account email yang telah dibuat

## Langkah-langkah Setup

### 1. Create Google Cloud Project

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Set project ID dan lokasi

### 2. Enable Google Sheets API

1. Di sidebar, pilih "APIs & Services" > "Library"
2. Cari "Google Sheets API"
3. Klik "Enable"

### 3. Create Service Account

1. Pergi ke "APIs & Services" > "Credentials"
2. Klik "Create Credentials" > "Service Account"
3. Isi Service Account details:
   - Name: `customer-analyst-sa`
   - Service account description: `Service account untuk Customer Data Analyst`
4. Klik "Create and Continue"
5. Skip granting roles (kita akan share spreadsheet langsung)
6. Klik "Done"

### 4. Create JSON Key

1. Klik pada service account yang baru dibuat
2. Pergi ke tab "Keys"
3. Klik "Add Key" > "Create new key"
4. Pilih "JSON"
5. Download JSON key file

### 5. Setup Environment Variables

Buka file `.env` dan tambahkan:

```bash
GOOGLE_SPREADSHEET_ID=1wFvF0dH_kkN4uB4GVuJZozvSzVpdr59TlJJH2iTHH-E
```

Untuk `GOOGLE_CREDENTIALS`, Anda perlu mengubah format JSON key:

**Original JSON key format:**
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "xxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "xxx@your-project-id.iam.gserviceaccount.com",
  "client_id": "xxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/xxx%40your-project-id.iam.gserviceaccount.com"
}
```

**Convert menjadi single line (escape quotes):**
```bash
GOOGLE_CREDENTIALS='{"type":"service_account","project_id":"your-project-id","private_key_id":"xxx","private_key":"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n","client_email":"xxx@your-project-id.iam.gserviceaccount.com","client_id":"xxx","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/xxx%40your-project-id.iam.gserviceaccount.com"}'
```

Tips: Gunakan tool online atau convert secara manual:
- Ganti semua `"` dengan `\"`
- Ganti semua baris baru `\n` dengan `\\n`
- Wrap dengan single quotes

### 6. Share Spreadsheet dengan Service Account

1. Buka spreadsheet: https://docs.google.com/spreadsheets/d/1wFvF0dH_kkN4uB4GVuJZozvSzVpdr59TlJJH2iTHH-E/edit
2. Klik "Share"
3. Masukkan email service account (contoh: `customer-analyst-sa@your-project-id.iam.gserviceaccount.com`)
4. Berikan permission: "Viewer" atau "Editor"
5. Klik "Send"

## Verifikasi Setup

Setelah setup selesai, Anda bisa melakukan query dengan contoh pertanyaan:

1. "Customer ABCD berapa kali pernah bertanya?"
2. "Customer ABCD total keluhan berapa?"
3. "Customer ABCD apakah pernah bertanya tentang input setup data?"
4. "Ringkasan masalah customer ABCD"

## Troubleshooting

### Error: "Invalid Credentials"
- Pastikan GOOGLE_CREDENTIALS format benar (single line, escaped quotes)
- Pastikan private key tidak expired
- Verifikasi semua fields ada di JSON

### Error: "Caller does not have permission"
- Pastikan spreadsheet sudah di-share dengan service account email
- Pastikan permission yang diberikan benar (Viewer/Editor)
- Tunggu beberapa menit setelah share (propagation delay)

### Error: "Spreadsheet not found"
- Verifikasi GOOGLE_SPREADSHEET_ID benar
- Pastikan spreadsheet tidak dihapus atau di-private

### Error: "Range not found"
- Pastikan nama sheet benar (Sheet1)
- Pastikan spreadsheet memiliki data
