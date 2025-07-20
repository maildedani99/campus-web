"use client"

import { useState } from "react"
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material"
import { useNotifications } from "../context/NotificationsContext"
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  const { toggle } = useNotifications()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "calc(100% - 224px)", // Sidebar width (56 * 4)
        left: 224,
        backgroundColor: "#121212",
        boxShadow: 2,
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* CENTRO: Navegación */}
        <Box sx={{ display: "flex", gap: 3, mx: "auto" }}>
          {[
            { label: "Pizarra", href: "/campus/whiteBoard" },
            { label: "Mis cursos", href: "/campus/courses" },
            { label: "Calendario", href: "/campus/calendar" },
            { label: "Participantes", href: "/campus/participants" },
            { label: "Mensajes", href: "#" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} passHref>
              <Typography
                variant="body2"
                sx={{
                  cursor: "pointer",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  color: "#e0e0e0",
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#ef4444",
                  },
                }}
              >
                {label}
              </Typography>
            </Link>
          ))}
        </Box>


        {/* DERECHA: Perfil y notificaciones */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Perfil */}
          <Button
            onClick={handleMenuClick}
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              textTransform: "none",
              borderColor: "#333",
              backgroundColor: "#2d2d2d",
              "&:hover": {
                backgroundColor: "#3a3a3a",
              },
            }}
            startIcon={<User size={18} />}
            endIcon={<ChevronDown size={16} />}
          >
            Perfil
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: "#2d2d2d",
                color: "white",
                minWidth: 180,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Settings size={16} style={{ marginRight: 8 }} /> Configuración
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <LogOut size={16} style={{ marginRight: 8 }} /> Cerrar sesión
            </MenuItem>
          </Menu>

          {/* Notificaciones */}
          <IconButton onClick={toggle} sx={{ color: "white" }}>
            <Badge
              badgeContent={2}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 10,
                  height: 16,
                  minWidth: 16,
                },
              }}
            >
              <Bell size={22} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
