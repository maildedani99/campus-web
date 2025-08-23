"use client"

import { Box, Paper, Typography, Divider } from "@mui/material"

export default function VideoItem() {
  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
        }}
      >
        {/* Título */}
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          Explicación sobre el autoconcepto
        </Typography>

        {/* Descripción */}
        <Typography
          variant="body2"
          sx={{ mb: 2, color: "text.secondary" }}
        >
          En este video abordaremos el significado del autoconcepto y cómo influye
          en tu proceso de transformación personal.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Video (16:9) */}
        <Box sx={{ position: "relative", pb: "56.25%", height: 0, mb: 3, borderRadius: 2, overflow: "hidden" }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // 🎥 reemplaza con el real
            title="Video explicativo"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </Box>

        {/* Cierre/reflexión */}
        <Typography variant="body1">
          Tómate unos minutos para reflexionar sobre lo que has aprendido y cómo
          puedes aplicarlo en tu día a día.
        </Typography>
      </Paper>
    </Box>
  )
}
