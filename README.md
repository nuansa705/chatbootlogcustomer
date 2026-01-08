# Customer Data Analyst

Aplikasi Next.js untuk analisis data customer berbasis Google Spreadsheet dengan antarmuka chat AI.

## Fitur Utama

- ✅ **Chat Interface**: Antarmuka chat interaktif dengan user-friendly UI
- ✅ **Intent Detection**: Mendeteksi jenis pertanyaan secara otomatis
- ✅ **Google Sheets Integration**: Mengambil data langsung dari Google Spreadsheet
- ✅ **Multi-Language**: Mendukung Bahasa Indonesia
- ✅ **Real-time Analysis**: Analisis data secara real-time
- ✅ **Anti-Halucination**: Jawaban berbasis data, tidak mengarang informasi

## Supported Intents

### 1. COUNT_INTERACTION
Menghitung total interaksi/bertanya dari customer.

**Contoh Pertanyaan:**
- "Customer ABCD berapa kali pernah bertanya?"
- "Jumlah pertanyaan customer ABCD"
- "Total pertanyaan customer ABCD"

**Response Format:**
```json
{
  "intent": "COUNT_INTERACTION",
  "customer": "ABCD",
  "total_interaction": 5
}
```

### 2. COUNT_KELUHAN
Menghitung total keluhan dari customer.

**Contoh Pertanyaan:**
- "Customer ABCD total keluhan berapa?"
- "Jumlah keluhan customer ABCD"
- "Berapa keluhan customer ABCD?"

**Response Format:**
```json
{
  "intent": "COUNT_KELUHAN",
  "customer": "ABCD",
  "total_keluhan": 3
}
```

### 3. CHECK_TOPIC
Mengecek apakah customer pernah bertanya tentang topik tertentu.

**Contoh Pertanyaan:**
- "Customer ABCD apakah pernah bertanya tentang input setup data?"
- "Ada pertanyaan customer ABCD tentang login?"
- "Customer ABCD pernah tanya tentang error upload?"

**Response Format:**
```json
{
  "intent": "CHECK_TOPIC",
  "customer": "ABCD",
  "topic": "input setup data",
  "count": 1
}
```

### 4. SUMMARY
Ringkasan lengkap data customer.

**Contoh Pertanyaan:**
- "Ringkasan masalah customer ABCD"
- "Laporan customer ABCD"
- "Summary customer ABCD"

**Response Format:**
```json
{
  "intent": "SUMMARY",
  "customer": "ABCD",
  "total_interaction": 5,
  "total_keluhan": 3,
  "total_pertanyaan": 2,
  "unique_topics": 4
}
```

## Struktur Data Spreadsheet

Spreadsheet memiliki struktur kolom sebagai berikut:

| Kolom | Nama | Deskripsi |
|-------|------|-----------|
| A | customer | Nama customer |
| B | keluhan | Isi keluhan customer |
| C | pertanyaan | Pertanyaan customer |

**Spreadsheet URL:** https://docs.google.com/spreadsheets/d/1wFvF0dH_kkN4uB4GVuJZozvSzVpdr59TlJJH2iTHH-E/edit

## Setup Project

### Prerequisites

- Node.js 18+ atau Bun
- Google Cloud Account
- Google Spreadsheet access

### 1. Clone/Setup Project

```bash
cd /home/z/my-project
bun install
```

### 2. Setup Google Sheets API

Lihat panduan lengkap di [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

### 3. Configure Environment Variables

Buat file `.env` di root project:

```bash
GOOGLE_SPREADSHEET_ID=1wFvF0dH_kkN4uB4GVuJZozvSzVpdr59TlJJH2iTHH-E
GOOGLE_CREDENTIALS='{"type":"service_account",...}'
```

### 4. Run Development Server

```bash
bun run dev
```

Aplikasi akan berjalan di http://localhost:3000

## API Endpoints

### POST /api/customer-query

Endpoint untuk memproses pertanyaan user.

**Request Body:**
```json
{
  "question": "Customer ABCD berapa kali pernah bertanya?"
}
```

**Response:**
```json
{
  "answer": "Customer ABCD tercatat pernah bertanya sebanyak 5 kali.",
  "data": {
    "intent": "COUNT_INTERACTION",
    "customer": "ABCD",
    "total_interaction": 5
  },
  "intent": {
    "intent": "COUNT_INTERACTION",
    "customer": "ABCD",
    "topic": null,
    "confidence": 0.8
  }
}
```

**Error Response:**
```json
{
  "answer": "Maaf, terjadi kesalahan saat memproses pertanyaan Anda.",
  "error": "Error message"
}
```

## Arsitektur Sistem

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React hooks

### Backend
- **API**: Next.js API Routes
- **Data Source**: Google Sheets API (via Service Account)
- **Authentication**: None (public access to read-only data)

### Logic Flow

1. User mengirim pertanyaan melalui chat interface
2. Frontend mengirim request ke `/api/customer-query`
3. Backend mendeteksi intent dari pertanyaan
4. Backend mengambil data dari Google Sheets
5. Backend memproses data sesuai intent
6. Backend menggenerate jawaban dalam bahasa natural
7. Frontend menampilkan jawaban ke user

## Aturan Sistem

### ✅ Diizinkan
- Mengambil data dari Google Spreadsheet
- Menghitung dan agregasi data
- Membuat narasi dari data terstruktur
- Menjawab berdasarkan data yang ada

### ❌ Dilarang
- Mengarang data
- Menjawab di luar data spreadsheet
- Menggunakan database eksternal
- Hardcoding credential Google API
- Menambahkan asumsi ke jawaban

## Troubleshooting

### Frontend Issues

**Tidak bisa mengirim pesan**
- Pastikan backend server berjalan
- Check dev server log
- Verifikasi API endpoint accessible

**UI tidak muncul**
- Clear browser cache
- Check browser console untuk error
- Pastikan dependencies terinstall

### Backend Issues

**Error connecting to Google Sheets**
- Verifikasi GOOGLE_CREDENTIALS format
- Pastikan Service Account aktif
- Check spreadsheet sharing permissions

**Intent tidak terdeteksi**
- Pastikan format pertanyaan sesuai contoh
- Gunakan kata kunci yang jelas (customer, bertanya, keluhan)
- Cek regex patterns di backend

**Data tidak ditemukan**
- Verifikasi customer name spelling
- Pastikan data ada di spreadsheet
- Check case sensitivity (partial match)

## Development

### Project Structure

```
/home/z/my-project/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── customer-query/
│   │   │       └── route.ts       # API endpoint
│   │   ├── page.tsx               # Frontend chat interface
│   │   ├── layout.tsx             # Root layout
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   └── ui/                    # shadcn/ui components
│   └── lib/
│       └── utils.ts               # Utility functions
├── prisma/
│   └── schema.prisma              # Prisma schema
├── mini-services/                 # Mini services (if needed)
├── .env.example                   # Environment variables example
├── GOOGLE_SHEETS_SETUP.md         # Google Sheets setup guide
├── package.json
└── tsconfig.json
```

### Running Tests

```bash
bun run lint
```

### Building for Production

```bash
bun run build
```

## Contoh Usage

### 1. Count Interactions

**User:**
"Customer ABCD berapa kali pernah bertanya?"

**AI Response:**
"Customer ABCD tercatat pernah bertanya sebanyak 5 kali."

### 2. Count Complaints

**User:**
"Customer ABCD total keluhan berapa?"

**AI Response:**
"Customer ABCD memiliki 3 keluhan tercatat."

### 3. Check Topic

**User:**
"Customer ABCD apakah pernah bertanya tentang input setup data?"

**AI Response:**
"Ya, customer ABCD pernah bertanya tentang "input setup data" sebanyak 1 kali."

### 4. Summary

**User:**
"Ringkasan masalah customer ABCD"

**AI Response:**
"Ringkasan untuk customer ABCD:
- Total interaksi: 5
- Total keluhan: 3
- Total pertanyaan: 2
- Topik unik: 4"

## Catatan Penting

- Sistem ini hanya membaca data dari spreadsheet (READ ONLY)
- Tidak ada database eksternal yang digunakan
- Spreadsheet adalah single source of truth
- Maximum ±20.000 baris data
- Fokus ke akurasi data, bukan UI
- AI hanya menyusun kalimat dari data terstruktur

## License

Project ini dibuat untuk keperluan analisis data customer.

## Support

Untuk setup Google Sheets API, lihat [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md).
