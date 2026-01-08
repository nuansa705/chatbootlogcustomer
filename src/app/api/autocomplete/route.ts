import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")?.toUpperCase() || ""

  if (q.length < 2) return NextResponse.json([])

  const file = path.join(process.cwd(), "db/customer_log.json")
  const data = JSON.parse(fs.readFileSync(file, "utf-8"))

  const result = data
    .filter((r: any) =>
      r.customer_code?.toUpperCase().includes(q)
    )
    .map((r: any) => r.keluhan)
    .filter(Boolean)

  return NextResponse.json([...new Set(result)].slice(0, 10))
}
