"use client"

import { Box, Paper, Typography } from "@mui/material"

export default function AudioItem() {
  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 6,
        px: { xs: 2, sm: 0 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          bgcolor: "#1f1f1f",
          color: "#fff",
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Escucha este audio
        </Typography>

        <Box sx={{ mt: 1 }}>
          <audio
            controls
            style={{ width: "100%", borderRadius: 8 }}
          >
            <source src="/audios/audio-ejemplo.mp3" type="audio/mpeg" />
            Tu navegador no soporta la reproducción de audio.
          </audio>
        </Box>

        <Typography
          variant="body2"
          sx={{ mt: 2, color: "rgba(255,255,255,0.7)" }}
        >
          Reflexiona mientras escuchas este audio guiado. Puedes repetirlo cuantas veces necesites.
        </Typography>
      </Paper>
    </Box>
  )
}
