"use client"

import { Box, Typography, Paper, Divider } from "@mui/material"

export default function VideoItem() {
  return (
    <Box
      sx={{
        maxWidth: "800px",
        mx: "auto",
        mt: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      {/* Contenedor principal */}
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, backgroundColor: "#1e1e1e", color: "#fff" }}>
        {/* Título */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Explicación sobre el autoconcepto
        </Typography>

        {/* Descripción opcional */}
        <Typography variant="body2" color="gray" mb={2}>
          En este video abordaremos el significado del autoconcepto y cómo influye en tu proceso de transformación personal.
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Video */}
        <Box sx={{ position: "relative", pb: "56.25%", height: 0, mb: 3 }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // 🎥 reemplazar por ID real
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video explicativo"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
          />
        </Box>

        {/* Cierre o reflexión */}
        <Typography variant="body1">
          Tómate unos minutos para reflexionar sobre lo que has aprendido y cómo puedes aplicarlo en tu día a día.
        </Typography>
      </Paper>
    </Box>
  )
}
