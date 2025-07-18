"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hola 👋 ¿En qué puedo ayudarte hoy?" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await res.json()
      if (data?.content) {
        setMessages([...newMessages, { role: "assistant", content: data.content }])
      } else {
        setMessages([...newMessages, { role: "assistant", content: "No se pudo obtener respuesta." }])
      }
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Error al enviar mensaje." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 transition"
        >
          <MessageCircle />
        </button>
      )}

      {open && (
        <div className="w-80 h-[420px] bg-neutral-900 text-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-primary">
            <span className="font-semibold text-sm">Asistente Virtual</span>
            <button onClick={() => setOpen(false)}><X size={18} /></button>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`whitespace-pre-line ${
                  msg.role === "user"
                    ? "text-right text-white"
                    : "text-left text-green-400"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="text-left text-gray-400 text-xs">Pensando...</div>}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-2">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-1 rounded bg-neutral-800 text-white text-sm focus:outline-none"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-primary px-3 py-1 rounded text-sm hover:bg-primary/80"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
