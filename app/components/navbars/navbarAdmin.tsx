// NavbarAdmin.tsx
"use client"

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"

const adminMenu = [
  { label: "Cursos", href: "/admin/cursos" },
  { label: "Clientes", href: "/admin/clientes" },
  { label: "Configuración", href: "/admin/configuracion" },
]

export default function NavbarAdmin() {
  return (
    <AppBar position="static" color="primary" sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Panel Admin
        </Typography>
        <Box>
          {adminMenu.map((item) => (
            <Button
              key={item.href}
              href={item.href}
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
