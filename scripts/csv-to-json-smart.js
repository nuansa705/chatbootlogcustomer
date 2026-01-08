/**
 * CSV → JSON (AUTO SKIP HEADER & AUTO MAPPING)
 * Cocok untuk CSV laporan campuran (summary + tabel)
 */

import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

const CSV_PATH = path.join(process.cwd(), 'db', 'customer_log.csv')
const JSON_PATH = path.join(process.cwd(), 'db', 'customer_log.json')

// Mapping header CSV → field JSON
const COLUMN_MAP = {
  'tanggal': 'tanggal',
  'kode_tiket': 'kode_tiket',
  'kode_customer': 'customer_code',
  'customer': 'customer_name',
  'platform': 'platform',
  'menu': 'menu',
  'jenis': 'jenis',
  'keluhan_permintaan': 'keluhan',
  'keluhan': 'keluhan',
  'status_keluhan': 'status',
  'status': 'status',
  'remarks': 'remarks'
}

// Normalize header text
function normalizeHeader(h) {
  return h
    .toLowerCase()
    .replace(/\//g, '_')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
}

// Find header row index
function findHeaderIndex(lines) {
  return lines.findIndex(line =>
    line.toLowerCase().includes('tanggal') &&
    line.toLowerCase().includes('customer')
  )
}

function run() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error('❌ CSV tidak ditemukan:', CSV_PATH)
    process.exit(1)
  }

  const raw = fs.readFileSync(CSV_PATH, 'utf8')
  const lines = raw.split(/\r?\n/)

  const headerIndex = findHeaderIndex(lines)
  if (headerIndex === -1) {
    console.error('❌ Header tabel tidak ditemukan (Tanggal, Customer)')
    process.exit(1)
  }

  console.log(`✅ Header ditemukan di baris ke-${headerIndex + 1}`)

  const cleanCSV = lines.slice(headerIndex).join('\n')

  const records = parse(cleanCSV, {
    columns: headers =>
      headers.map(h => normalizeHeader(h)),
    skip_empty_lines: true,
    relax_quotes: true
  })

  const data = records.map((row, i) => {
    const result = { id: i + 1 }

    for (const [csvKey, jsonKey] of Object.entries(COLUMN_MAP)) {
      result[jsonKey] = row[csvKey] ?? ''
    }

    return result
  })

  fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2))

  console.log(`✅ CSV → JSON sukses`)
  console.log(`📊 Total rows: ${data.length}`)
  console.log(`📁 Output: ${JSON_PATH}`)
}

run()
