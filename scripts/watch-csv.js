/**
 * AUTO RELOAD CSV → JSON
 * Watch CSV file and auto convert when changed
 */

import chokidar from 'chokidar'
import { exec } from 'child_process'
import path from 'path'

const CSV_PATH = path.join(process.cwd(), 'db', 'customer_log.csv')

console.log('👀 Watching CSV for changes...')
console.log('📁', CSV_PATH)

// Watch CSV file
chokidar.watch(CSV_PATH, {
  ignoreInitial: true
}).on('change', () => {
  console.log('🔄 CSV changed → updating JSON...')

  exec('node scripts/csv-to-json-smart.js', (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Convert failed:', err.message)
      return
    }
    if (stderr) console.error(stderr)
    console.log(stdout.trim())
    console.log('✅ JSON updated')
  })
})
