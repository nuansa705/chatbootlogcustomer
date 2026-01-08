const fs = require('fs')

// Read database
const dbData = JSON.parse(fs.readFileSync('/home/z/my-project/db/customer_log.json', 'utf8'))

// Find STR record
const strRecord = dbData.find(r => r.customer_code === 'STR')

if (strRecord) {
  console.log('STR Record found:')
  console.log('Keluhan:', strRecord.keluhan)
  console.log('Menu:', strRecord.menu)
  console.log('Platform:', strRecord.platform)
  console.log('')

  // Test matching
  const searchTerms = ['database', 'koneksi']
  console.log('Testing search terms:', searchTerms)
  console.log('')

  searchTerms.forEach(term => {
    const matchKeluhan = strRecord.keluhan.toLowerCase().includes(term.toLowerCase())
    const matchMenu = strRecord.menu.toLowerCase().includes(term.toLowerCase())
    const matchPlatform = strRecord.platform.toLowerCase().includes(term.toLowerCase())

    console.log(`Term: "${term}"`)
    console.log(`  Keluhan match: ${matchKeluhan}`)
    console.log(`  Menu match: ${matchMenu}`)
    console.log(`  Platform match: ${matchPlatform}`)
    console.log(`  Overall match: ${matchKeluhan || matchMenu || matchPlatform}`)
    console.log('')
  })

  // All STR records
  console.log('All STR records:')
  const strRecords = dbData.filter(r => r.customer_code === 'STR')
  strRecords.forEach((r, i) => {
    console.log(`${i + 1}. ${r.menu}:`)
    console.log(`   Keluhan: ${r.keluhan.substring(0, 60)}...`)
  })
} else {
  console.log('STR Record NOT found!')
}
