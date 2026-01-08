'use client'

//import { useState } from 'react'
import { useState, useRef, useEffect } from 'react'
import { Send, MessageSquare, Bot, User } from 'lucide-react'



interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function CustomerAnalystChat() {
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([]) // ✅ DI SINI
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const inputText = input.trim()
    if (!inputText || isLoading) {
      return
    }

    console.log('Starting to send message:', inputText)

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      console.log('Making fetch request...')
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: inputText
        })
      })

      console.log('Got response:', response.status)

      const text = await response.text()
      console.log('Response text:', text)

      let data
      try {
        data = JSON.parse(text)
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError)
        throw new Error('Invalid response from server')
      }

      console.log('Parsed data:', data)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer?.keluhan
          ? data.answer.keluhan.map((k: string, idx: number) => `${idx + 1}. ${k}`).join('\n')
          : typeof data.answer === 'string'
            ? data.answer
            : 'Maaf, tidak dapat memproses pertanyaan tersebut.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      console.error('Error caught:', err)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Error: ' + (err instanceof Error ? err.message : 'Unknown error'),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      console.log('Request completed')
    }
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  setInput(value)

  if (value.length < 2) {
    setSuggestions([])
    return
  }

  const res = await fetch(`/api/autocomplete?q=${value}`)
  const data = await res.json()
  setSuggestions(data)
}

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [messages, isLoading])


  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: '#f8fafc', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      margin: 0,
      padding: 0
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e2e8f0', 
        padding: '16px', 
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)' 
      }}>
        <div style={{ 
          maxWidth: '896px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          <div style={{ backgroundColor: '#e0e7ff', padding: '8px', borderRadius: '8px' }}>
            <MessageSquare size={24} style={{ color: '#4f46e5' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
              Customer Data Analyst
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              Asisten Analisis Data Customer
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          maxWidth: '896px',
          width: '100%',
          margin: '0 auto',
          padding: '16px'
        }}
      >
        {/* Card */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}
        >
          {/* Card Header */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              padding: '20px 24px'
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>
              Chat Interface
            </h2>
          </div>

          {/* Card Body */}
          <div style={{ padding: '20px 24px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '400px'
              }}
            >
              {/* Messages Area */}
              <div
                style={{
                  flex: 1,
                  marginBottom: '20px',
                  overflowY: 'auto',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  position: 'relative',
                  zIndex: 9999,
                  backgroundColor: '#f8fafc',
                  color: 'black'
                }}
              >
                {/* messages.map dll — TIDAK DIUBAH */}
                {messages.map(message => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-end',
                    gap: '8px',
                    marginBottom: '14px',
                    animation: 'fadeSlideIn 0.25s ease-out'
                  }}
        >
          {/* AVATAR BOT */}
          {message.role === 'assistant' && (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#e0e7ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}
            >
              🤖
             {/* TYPING INDICATOR */}
            {isLoading && (
              <div style={{ display: 'flex', gap: '6px', color: '#64748b' }}>
                <Bot size={16} />
                <span>Mengetik</span>
                <span>•••</span>
              </div>
            )}

            <div ref={bottomRef} />
            </div>
          )}

          {/* BUBBLE */}
          <div
        style={{
          maxWidth: '70%',
          padding: '12px 14px',
          borderRadius: '14px',
          backgroundColor: message.role === 'user' ? '#4f46e5' : '#ffffff',
          color: message.role === 'user' ? 'white' : '#0f172a',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          borderTopRightRadius: message.role === 'user' ? '4px' : '14px',
          borderTopLeftRadius: message.role === 'user' ? '14px' : '4px',
          lineHeight: 1.5,
          fontSize: '14px',
          whiteSpace: 'pre-line' // ✅ supaya \n muncul sebagai line break
        }}
      >
        {message.content}
      </div>


          {/* AVATAR USER */}
          {message.role === 'user' && (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#c7d2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}
            >
              👤
            </div>           
          )}
         
          

        </div>
      ))}

{isLoading && (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: '8px',
      marginBottom: '14px',
      animation: 'fadeSlideIn 0.2s ease-out'
    }}
  >
    {/* Avatar Bot */}
    <div
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#e0e7ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px'
      }}
    >
      🤖
    </div>

    {/* Bubble */}
    <div
      style={{
        backgroundColor: 'white',
        padding: '10px 14px',
        borderRadius: '14px',
        borderTopLeftRadius: '4px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        display: 'flex',
        gap: '4px'
      }}
    >
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  </div>
)}


              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit}>
                <div style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ketik pertanyaan Anda..."
                      style={{ flex: 1 }}
                    />
                    <button type="submit">
                      <Send size={18} />
                    </button>
                  </div>

                  {suggestions.length > 0 && (
                    <div>
                      {suggestions.map((s, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setInput(s)
                            setSuggestions([])
                          }}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>


      <style jsx global>{`
  .dot {
    width: 6px;
    height: 6px;
    background-color: #64748b;
    border-radius: 50%;
    animation: blink 1.4s infinite both;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0% { opacity: 0.2; }
    20% { opacity: 1; }
    100% { opacity: 0.2; }
  }
`}</style>


<style jsx global>{`
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>


</div>
  )
}



