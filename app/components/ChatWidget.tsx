"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X } from "lucide-react"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hola 👋 soy iRomi, tu coach virtual. ¿En qué puedo ayudarte?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      const data = await res.json()

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data?.content || "No se pudo obtener respuesta.",
        },
      ])
    } catch (error) {
      console.error("Error al enviar el mensaje:", error)
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Ha ocurrido un error. Inténtalo más tarde.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-3 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition"
        >
          <MessageCircle size={20} />
        </button>
      )}

      {open && (
        <div className="w-80 h-[440px] flex flex-col bg-[#1e1e1e] text-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-3 py-2 bg-red-500">
            <span className="text-sm font-bold">Coach virtual</span>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200">
              <X size={18} />
            </button>
          </div>

          {/* Chat body */}
          <div className="flex-1 px-3 py-2 overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-1 whitespace-pre-line ${
                  msg.role === "user" ? "text-right text-white" : "text-left text-emerald-300"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <span className="text-xs text-gray-400">Pensando...</span>}
            <div ref={chatRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="flex-1 text-sm px-3 py-2 rounded-md bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-md hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? "..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
