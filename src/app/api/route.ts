import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'

type Intent = 'COUNT_INTERACTION' | 'COUNT_KELUHAN' | 'CHECK_TOPIC' | 'SUMMARY' | 'UNKNOWN'

interface DetectedIntent {
  intent: Intent
  customer: string | null
  topic: string | null
  confidence: number
}

// ------------------
// Extract Customer
// ------------------
function extractCustomer(question: string, data: any[]): string | null {
  const qWords = question.toLowerCase().split(/\s+/)
  for (const row of data) {
    const name = row.customer_name?.toLowerCase()
    const code = row.customer_code?.toLowerCase()
    if (!name && !code) continue
    if (name && qWords.some(w => name.includes(w))) return row.customer_name
    if (code && qWords.some(w => code.includes(w))) return row.customer_code
  }
  return null
}

// ------------------
// Extract Topic
// ------------------
function extractTopicSmart(question: string): string | null {
  const match = question.match(/(?:tentang|masalah|error|kendala|tampilkan keluhan|total keluhan)\s*(.*)/i)
  return match ? match[1].trim() : null
}

// ------------------
// Extract Date Range
// ------------------
function extractDateRange(question: string): { startDate: string; endDate: string } | null {
  const match = question.match(/dari tanggal (\d{2}-\d{2}-\d{4}) s\.d (\d{2}-\d{2}-\d{4})/i)
  if (!match) return null
  const [_, start, end] = match
  const parse = (d: string) => {
    const [dd, mm, yyyy] = d.split('-')
    return `${yyyy}-${mm}-${dd}` // format YYYY-MM-DD
  }
  return { startDate: parse(start), endDate: parse(end) }
}

// ------------------
// Detect Intent
// ------------------
function detectIntentSmart(question: string): Intent {
  const q = question.toLowerCase()
  if (q.includes('keluhan') || q.includes('tampilkan keluhan')) return 'CHECK_TOPIC'
  if (q.includes('jumlah') || q.includes('total') || q.includes('interaksi')) return 'COUNT_INTERACTION'
  if (q.includes('summary') || q.includes('ringkasan')) return 'SUMMARY'
  if (q.includes('total keluhan')) return 'COUNT_KELUHAN'
  return 'UNKNOWN'
}

// ------------------
// Load Database
// ------------------
async function getDatabaseData() {
  const dbPath = '/home/z/my-project/db/customer_log.json'
  const jsonContent = fs.readFileSync(dbPath, 'utf8')
  const data = JSON.parse(jsonContent)
  return data
}

// ------------------
// Process Data
// ------------------
async function processData(question: string, data: any[]) {
  const intent = detectIntentSmart(question)
  const customer = extractCustomer(question, data)
  const topic = extractTopicSmart(question)
  const dateRange = extractDateRange(question)

  if (!customer) return { error: 'Customer tidak ditemukan' }

  // Filter by customer
  let customerRows = data.filter(row => row.customer_name === customer || row.customer_code === customer)

  // Filter by date if available
  if (dateRange) {
    const { startDate, endDate } = dateRange
    customerRows = customerRows.filter(row => row.tanggal && row.tanggal >= startDate && row.tanggal <= endDate)
  }

  switch (intent) {
    case 'CHECK_TOPIC': {
      const keluhanRows = customerRows.filter(
        row => row.keluhan && row.keluhan.toString().trim() !== '' && row.keluhan.toString() !== '-'
      )
      return {
        intent,
        customer,
        keluhan: keluhanRows.map(r => r.keluhan),
        total_keluhan: keluhanRows.length
      }
    }

    case 'COUNT_KELUHAN': {
      const keluhanCount = customerRows.filter(
        row => row.keluhan && row.keluhan.toString().trim() !== '' && row.keluhan.toString() !== '-'
      ).length
      return {
        intent,
        customer,
        total_keluhan: keluhanCount
      }
    }

    case 'SUMMARY': {
      const totalInteraction = customerRows.length
      const keluhanCount = customerRows.filter(r => r.keluhan && r.keluhan.toString().trim() !== '' && r.keluhan.toString() !== '-').length
      return {
        intent,
        customer,
        total_interaction: totalInteraction,
        total_keluhan: keluhanCount
      }
    }

    case 'COUNT_INTERACTION': {
      return {
        intent,
        customer,
        total_interaction: customerRows.length
      }
    }

    default:
      return { error: 'Intent tidak dikenali' }
  }
}

// ------------------
// GET Endpoint
// ------------------
export async function GET() {
  return NextResponse.json({ message: 'Customer Data Analyst API ready' })
}

// ------------------
// POST Endpoint
// ------------------
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question } = body
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    const data = await getDatabaseData()
    const processedData = await processData(question, data)

    if (processedData.error) {
      return NextResponse.json({ answer: processedData.error, data: processedData })
    }

    // Natural language response
    let answerText = ''
    switch (processedData.intent) {
      case 'CHECK_TOPIC':
        answerText = processedData.keluhan
          .map((k: string, i: number) => `${i + 1}. ${k}`)
          .join('\n')
        break
      case 'COUNT_KELUHAN':
        answerText = `Total keluhan customer ${processedData.customer}: ${processedData.total_keluhan}`
        break
      case 'SUMMARY':
        answerText = `Ringkasan customer ${processedData.customer}:\nTotal interaksi: ${processedData.total_interaction}\nTotal keluhan: ${processedData.total_keluhan}`
        break
      case 'COUNT_INTERACTION':
        answerText = `Total interaksi customer ${processedData.customer}: ${processedData.total_interaction}`
        break
      default:
        answerText = 'Maaf, tidak dapat memproses pertanyaan tersebut.'
    }

    return NextResponse.json({ answer: answerText, data: processedData })
  } catch (error) {
    return NextResponse.json(
      {
        answer: 'Terjadi kesalahan saat memproses pertanyaan',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
