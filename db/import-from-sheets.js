const { Database } = require('sqlite3')
const fetch = require('node-fetch')

const SPREADSHEET_ID = '1wFvF0dH_kkN4uB4GVuJZozvSzVpdr59TlJJH2iTHH-E'
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=1841884113`

// Parse CSV to array of arrays
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

async function fetchAndImportData() {
  try {
    console.log('Fetching data from Google Sheets...')
    console.log('URL:', CSV_URL)

    const response = await fetch(CSV_URL, {
      redirect: 'follow'
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch spreadsheet: ${response.status} ${response.statusText}`)
    }

    const csvText = await response.text()
    console.log('CSV data length:', csvText.length)

    const rows = parseCSV(csvText)
    console.log('Parsed rows:', rows.length)

    // Find header row
    const headerRowIndex = rows.findIndex(row =>
      row.some(cell => cell && cell.toLowerCase() === 'customer')
    )

    if (headerRowIndex === -1) {
      throw new Error('Header row not found in data')
    }

    console.log('Header row index:', headerRowIndex)
    const headerRow = rows[headerRowIndex]
    console.log('Header row:', headerRow)

    // Find column indices
    const customerColIndex = headerRow.findIndex(cell => cell && cell.toLowerCase() === 'customer')
    const customerCodeColIndex = headerRow.findIndex(cell => cell && cell.toLowerCase() === 'kode customer')
    const keluhanColIndex = headerRow.findIndex(cell => cell && cell.toLowerCase().includes('keluhan'))

    console.log('Column indices - Customer:', customerColIndex, 'Customer Code:', customerCodeColIndex, 'Keluhan:', keluhanColIndex)

    // Get data rows
    const dataRows = rows.slice(headerRowIndex + 1)
    console.log('Data rows (after header):', dataRows.length)

    // Import to SQLite
    const dbPath = '/home/z/my-project/db/custom.db'
    console.log('Opening database:', dbPath)

    const db = new Database(dbPath)

    // Prepare insert statement
    const stmt = db.prepare(`
      INSERT INTO customer_interactions (customer_name, customer_code, keluhan)
      VALUES (?, ?, ?)
    `)

    let imported = 0
    let skipped = 0

    for (const row of dataRows) {
      const customerName = customerColIndex >= 0 ? (row[customerColIndex] || '').trim() : ''
      const customerCode = customerCodeColIndex >= 0 ? (row[customerCodeColIndex] || '').trim() : ''
      const keluhan = keluhanColIndex >= 0 ? (row[keluhanColIndex] || '').trim() : ''

      // Skip if no customer name or code
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
    db.close()

    console.log('========================================')
    console.log('Import completed!')
    console.log('========================================')
    console.log('Rows imported:', imported)
    console.log('Rows skipped:', skipped)
    console.log('Database location:', dbPath)
    console.log('========================================')

    // Print some sample queries
    const db2 = new Database(dbPath)
    const sampleData = db2.prepare('SELECT * FROM customer_interactions LIMIT 5').all()
    console.log('Sample data:')
    console.log(JSON.stringify(sampleData, null, 2))
    db2.close()

  } catch (error) {
    console.error('Error during import:', error)
    process.exit(1)
  }
}

// Run the import
fetchAndImportData()
