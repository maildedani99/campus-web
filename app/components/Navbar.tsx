"use client"

import { AppBar, Toolbar, Box, Typography, IconButton, Button, Menu, MenuItem, Badge } from "@mui/material"
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useNotifications } from "../context/NotificationsContext"
import { drawerWidth } from "../constants/layout"

const links = [
  { label: "Pizarra", href: "/campus/whiteBoard" },
  { label: "Mis cursos", href: "/campus/courses" },
  { label: "Calendario", href: "/campus/calendar" },
  { label: "Participantes", href: "/campus/participants" },
  { label: "Mensajes", href: "#" },
]

export default function Navbar() {
  const { toggle } = useNotifications()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  return (
    <AppBar
      position="fixed"
      sx={{
        ml: `${drawerWidth}px`,
        width: `calc(100% - ${drawerWidth}px)`,
        backgroundColor: "#202120",
        boxShadow: 2,
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 3, mx: "auto" }}>
        
          {links.map(({ label, href }) => (
            <Link key={label} href={href} passHref>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", fontWeight: 600, color: "#e0e0e0", "&:hover": { color: "#ef4444" } }}
              >
                {label}
              </Typography>
            </Link>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            variant="outlined" size="small"
            sx={{ color: "white", textTransform: "none", borderColor: "#333", backgroundColor: "#2d2d2d",
                  "&:hover": { backgroundColor: "#3a3a3a" } }}
            startIcon={<User size={18} />} endIcon={<ChevronDown size={16} />}
          >
            Perfil
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { backgroundColor: "#2d2d2d", color: "white", minWidth: 180 } }}>
            <MenuItem onClick={() => setAnchorEl(null)}><Settings size={16} style={{ marginRight: 8 }} /> Configuración</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}><LogOut size={16} style={{ marginRight: 8 }} /> Cerrar sesión</MenuItem>
          </Menu>

          <IconButton onClick={toggle} sx={{ color: "white" }}>
            <Badge badgeContent={2} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 16, minWidth: 16 } }}>
              <Bell size={22} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
