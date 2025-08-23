"use client"

import {
  Box, Drawer, List, ListItemButton, ListItemText,
  Divider, Collapse, ListItemIcon, Typography
} from "@mui/material"
import { ExpandLess, ExpandMore, CheckCircle, CancelRounded } from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { mockSemanas } from "@/app/data/mockSemanas"
import { drawerWidth } from "@/app/constants/layout"

const semanas = mockSemanas

type Role = "client" | "teacher" | "admin"

export default function SidebarClient({ role = "client" }: { role?: Role }) {
  const [open, setOpen] = useState<string[]>(["Semana 1", "Semana 2"])
  const toggleWeek = (t: string) =>
    setOpen(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const isClient = role === "client"

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth, flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth, boxSizing: "border-box",
          backgroundColor: "#202120", color: "#fff",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <Typography variant="caption" color="primary" sx={{ display:"block", mt: 1 }}>
          21 Days – Julio 2025
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          {role.toUpperCase()}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Bloque de semanas -> solo enlaza en CLIENT */}
      <List>
        {semanas.map(semana => {
          const isOpen = open.includes(semana.title)
          return (
            <Box key={semana.title}>
              <ListItemButton onClick={() => toggleWeek(semana.title)}>
                <ListItemText primary={semana.title} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {semana.items.map(item => {
                    const href = `/campus/client/item/${item.id}` 
                    return isClient ? (
                      <Link key={item.id} href={href} passHref>
                        <ListItemButton component="a" sx={{ pl: 4 }}>
                          <ListItemIcon sx={{ minWidth: 24, color: item.done ? "green" : "#ef4444" }}>
                            {item.done ? <CheckCircle fontSize="small" /> : <CancelRounded fontSize="small" />}
                          </ListItemIcon>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </Link>
                    ) : (
                      <ListItemButton key={item.id} sx={{ pl: 4 }} disabled>
                        <ListItemIcon sx={{ minWidth: 24, color: item.done ? "green" : "#ef4444" }}>
                          {item.done ? <CheckCircle fontSize="small" /> : <CancelRounded fontSize="small" />}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    )
                  })}
                </List>
              </Collapse>
            </Box>
          )
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mt: 2 }} />

      {/* Extras (puedes filtrar por rol si quieres) */}
      <List>
        <ListItemButton><ListItemText primary="Encuestas" /></ListItemButton>
        <ListItemButton><ListItemText primary="Material adicional" /></ListItemButton>
      </List>
    </Drawer>
  )
}
