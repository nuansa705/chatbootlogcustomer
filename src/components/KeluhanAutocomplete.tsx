"use client"

import { useState, useEffect } from "react"

export default function KeluhanAutocomplete() {
  const [keyword, setKeyword] = useState("")
  const [results, setResults] = useState<string[]>([])

  useEffect(() => {
    if (keyword.length < 2) {
      setResults([])
      return
    }

    const controller = new AbortController()

    fetch(`/api/keluhan?q=${keyword}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(setResults)
      .catch(() => {})

    return () => controller.abort()
  }, [keyword])

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Ketik kode customer (contoh: LAM)"
        className="w-full border rounded px-3 py-2"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 max-h-60 overflow-auto rounded shadow">
          {results.map((item, i) => (
            <li
              key={i}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => setKeyword(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
