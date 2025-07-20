"use client"

import { Box, Typography } from "@mui/material"

export default function AudioItem() {
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
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Escucha este audio
      </Typography>

      <audio controls style={{ width: "100%", borderRadius: "8px" }}>
        <source src="/audios/audio-ejemplo.mp3" type="audio/mpeg" />
        Tu navegador no soporta la reproducción de audio.
      </audio>

      <Typography
        variant="body2"
        color="gray"
        sx={{ mt: 2 }}
      >
        Reflexiona mientras escuchas este audio guiado. Puedes repetirlo cuantas veces necesites.
      </Typography>
    </Box>
  )
}
