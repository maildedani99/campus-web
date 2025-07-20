"use client"

import { useState } from "react"
import { Box, Typography, TextField, Button } from "@mui/material"

export default function TextItem() {
  const [response, setResponse] = useState("")

  const handleSave = () => {
    if (!response.trim()) return
    // Lógica de guardado aquí (API call, etc.)
    console.log("Respuesta guardada:", response)
  }

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 6,
        p: 4,
        backgroundColor: "#1f1f1f",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Reflexión escrita
      </Typography>
      <Typography variant="body2" color="gray" gutterBottom>
        ¿Cómo te has sentido esta semana? ¿Qué aprendizajes destacarías?
      </Typography>

      <TextField
        multiline
        minRows={5}
        fullWidth
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Escribe tu respuesta aquí..."
        sx={{
          mt: 2,
          mb: 3,
          backgroundColor: "#2a2a2a",
          color: "#fff",
          input: { color: "white" },
          textarea: { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#888" },
            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
          },
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ textTransform: "none" }}
      >
        Guardar respuesta
      </Button>
    </Box>
  )
}
