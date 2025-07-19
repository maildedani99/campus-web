"use client"

import { Box } from "@mui/material"
import Image from "next/image"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        px: 2,
      }}
    >
      {/* Marca de agua más visible */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.75, // subido para que sea visible
          zIndex: 0,
          filter: "blur(2px)", // difumina suavemente
          pointerEvents: "none",
        }}
      >
        <Image src="/logo.png" alt="Logo Rebirth" width={500} height={500} priority />
      </Box>

      {/* Contenido del formulario */}
      <Box
        sx={{
          zIndex: 1,
          width: "100%",
          maxWidth: 800,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
