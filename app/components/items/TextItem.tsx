"use client"

import { useState } from "react"
import { Box, Paper, Typography, TextField, Button } from "@mui/material"

export default function TextItem() {
  const [response, setResponse] = useState("")

  const handleSave = () => {
    if (!response.trim()) return
    // Aquí iría la lógica real (API call, etc.)
    console.log("Respuesta guardada:", response)
  }

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Título */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Reflexión escrita
        </Typography>

        {/* Enunciado */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          ¿Cómo te has sentido esta semana? ¿Qué aprendizajes destacarías?
        </Typography>

        {/* Campo de texto */}
        <TextField
          fullWidth
          multiline
          minRows={5}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Escribe tu respuesta aquí..."
          variant="outlined"
          sx={{ mb: 3 }}
        />

        {/* Botón */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Guardar respuesta
        </Button>
      </Paper>
    </Box>
  )
}
