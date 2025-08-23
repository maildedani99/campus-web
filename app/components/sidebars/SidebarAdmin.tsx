"use client"

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import PaymentIcon from "@mui/icons-material/Payment"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import SchoolIcon from "@mui/icons-material/School"
import Image from "next/image"
import Link from "next/link"
import { drawerWidth } from "@/app/constants/layout"

export default function SidebarAdmin() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#202120",
          color: "#fff",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Image src="/logo.png" alt="Logo" width={80} height={80} />
        <Typography variant="caption" color="primary" sx={{ display: "block", mt: 1 }}>
          Admin Panel
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <List>
        <Link href="/campus/admin/clients">
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItemButton>
        </Link>

        <Link href="/campus/admin/payments">
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Pagos" />
          </ListItemButton>
        </Link>

        <Link href="/campus/admin/courses">
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Cursos" />
          </ListItemButton>
        </Link>

        <Link href="/campus/admin/teachers">
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Tutores" />
          </ListItemButton>
        </Link>
      </List>
    </Drawer>
  )
}
