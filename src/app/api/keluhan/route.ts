import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")?.toUpperCase() || ""

  if (!q) {
    return NextResponse.json([])
  }

  const filePath = path.join(process.cwd(), "db/customer_log.json")
  const raw = fs.readFileSync(filePath, "utf-8")
  const data = JSON.parse(raw)

  const result = data
    .filter((row: any) =>
      row.customer_code?.toUpperCase().includes(q)
    )
    .map((row: any) => row.keluhan)
    .filter(Boolean)

  return NextResponse.json(result)
}
