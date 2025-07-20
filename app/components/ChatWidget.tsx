"use client"

import { useEffect, useRef, useState } from "react"
import {
  Box,
  IconButton,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Fade,
} from "@mui/material"
import { MessageCircle, X } from "lucide-react"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hola 👋 soy iRomi, tu couch virtual. ¿En qué puedo ayudarte?",
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
    <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}>
      {!open && (
        <Fade in={!open}>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "#ef4444",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#dc2626",
              },
              boxShadow: 4,
            }}
            size="large"
          >
            <MessageCircle size={20} />
          </IconButton>
        </Fade>
      )}

      {open && (
        <Paper
          elevation={6}
          sx={{
            width: 360,
            height: 440,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#1e1e1e",
            color: "#fff",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              bgcolor: "#ef4444",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              Couch virtual
            </Typography>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <X size={18} />
            </IconButton>
          </Box>

          {/* Chat body */}
          <Box
            sx={{
              flex: 1,
              px: 2,
              py: 1.5,
              overflowY: "auto",
              fontSize: "0.85rem",
              "&::-webkit-scrollbar": { width: 6 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#444",
                borderRadius: 2,
              },
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  textAlign: msg.role === "user" ? "right" : "left",
                  color: msg.role === "user" ? "#fff" : "#6ee7b7",
                  whiteSpace: "pre-line",
                  mb: 1,
                }}
              >
                {msg.content}
              </Box>
            ))}
            {loading && (
              <Typography variant="caption" color="gray">
                Pensando...
              </Typography>
            )}
            <div ref={chatRef} />
          </Box>

          {/* Input */}
          <Box sx={{ p: 1.5, borderTop: "1px solid #333" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                sx={{
                  input: {
                    color: "#fff",
                    backgroundColor: "#2a2a2a",
                  },
                  fieldset: {
                    borderColor: "#444",
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSend}
                disabled={loading}
                sx={{
                  bgcolor: "#ef4444",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#dc2626" },
                }}
              >
                {loading ? <CircularProgress size={16} color="inherit" /> : "Enviar"}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  )
}
