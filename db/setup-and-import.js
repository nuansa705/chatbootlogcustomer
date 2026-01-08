const { Database } = require('sqlite3')
const fs = require('fs')

const dbPath = '/home/z/my-project/db/custom.db'

console.log('========================================')
console.log('Database Setup & Import')
console.log('========================================')
console.log('Database path:', dbPath)

// Remove existing database if exists
if (fs.existsSync(dbPath)) {
  console.log('Removing existing database...')
  try {
    fs.unlinkSync(dbPath)
    console.log('✅ Existing database removed')
  } catch (error) {
    console.error('❌ Error removing database:', error)
    process.exit(1)
  }
}

// Create new database
console.log('Creating new database...')
let db
try {
  db = new Database(dbPath)
  console.log('✅ Database created')
} catch (error) {
  console.error('❌ Error creating database:', error)
  process.exit(1)
}

// Create table
console.log('Creating table...')
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
  console.log('✅ Table created')
} catch (error) {
  console.error('❌ Error creating table:', error)
  db.close()
  process.exit(1)
}

// Close database before import
try {
  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err)
      process.exit(1)
    }
    console.log('✅ Database closed')

    // Now run import
    console.log('========================================')
    console.log('Starting Import from Google Sheets')
    console.log('========================================')

    runImport()
  })
} catch (error) {
  console.error('❌ Error closing database:', error)
  process.exit(1)
}

function runImport() {
  const { Database } = require('sqlite3')
  const SPREADSHEET_ID = '1wFvF0dH_kkN4uB4GVuJZozvSzVpdr59TlJJH2iTHH-E'
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=1841884113`

  fetch(CSV_URL, { redirect: 'follow' })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return response.text()
    })
    .then(csvText => {
      console.log('✅ CSV fetched, length:', csvText.length)

      // Parse CSV
      const rows = parseCSV(csvText)
      console.log('✅ Parsed rows:', rows.length)

      // Find header row
      const headerRowIndex = rows.findIndex(row =>
        row.some(cell => cell && cell.toLowerCase() === 'customer')
      )

      if (headerRowIndex === -1) {
        throw new Error('Header row not found')
      }

      const headerRow = rows[headerRowIndex]
      const customerColIndex = headerRow.findIndex(cell => cell && cell.toLowerCase() === 'customer')
      const customerCodeColIndex = headerRow.findIndex(cell => cell && cell.toLowerCase() === 'kode customer')
      const keluhanColIndex = headerRow.findIndex(cell => cell && cell.toLowerCase().includes('keluhan'))

      console.log('Column indices - Customer:', customerColIndex, 'Code:', customerCodeColIndex, 'Keluhan:', keluhanColIndex)

      const dataRows = rows.slice(headerRowIndex + 1)
      console.log('Data rows:', dataRows.length)

      // Import to database
      const db2 = new Database(dbPath, { fileMustExist: false })
      const stmt = db2.prepare('INSERT INTO customer_interactions (customer_name, customer_code, keluhan) VALUES (?, ?, ?)')

      let imported = 0
      let skipped = 0

      for (const row of dataRows) {
        const customerName = customerColIndex >= 0 ? (row[customerColIndex] || '').trim() : ''
        const customerCode = customerCodeColIndex >= 0 ? (row[customerCodeColIndex] || '').trim() : ''
        const keluhan = keluhanColIndex >= 0 ? (row[keluhanColIndex] || '').trim() : ''

        if (!customerName && !customerCode) {
          skipped++
          continue
        }

        try {
          stmt.run(customerName, customerCode, keluhan)
          imported++
        } catch (error) {
          console.error('Error inserting row:', error)
        }
      }

      stmt.finalize()
      db2.close()

      console.log('========================================')
      console.log('✅ Import Completed!')
      console.log('========================================')
      console.log('Rows imported:', imported)
      console.log('Rows skipped:', skipped)
      console.log('Database location:', dbPath)
      console.log('========================================')

      // Verify
      const db3 = new Database(dbPath)
      const total = db3.prepare('SELECT COUNT(*) as count FROM customer_interactions').get()
      console.log('Total records in database:', total.count)
      db3.close()
    })
    .catch(error => {
      console.error('❌ Import error:', error)
      process.exit(1)
    })
}

function parseCSV(csvText) {
  const rows = []
  let currentRow = []
  let currentCell = ''
  let inQuotes = false

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i]
    const nextChar = csvText[i + 1]

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentCell += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        currentCell += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        currentRow.push(currentCell)
        currentCell = ''
      } else if (char === '\r' && nextChar === '\n') {
        currentRow.push(currentCell)
        rows.push(currentRow)
        currentRow = []
        currentCell = ''
        i++
      } else if (char === '\n' || char === '\r') {
        currentRow.push(currentCell)
        rows.push(currentRow)
        currentRow = []
        currentCell = ''
      } else {
        currentCell += char
      }
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell)
    rows.push(currentRow)
  }

  return rows
}
