"use client"

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  ListItemIcon,
} from "@mui/material"
import Image from "next/image"
import {
  ExpandLess,
  ExpandMore,
  CheckCircle,
  CancelRounded,
} from "@mui/icons-material"
import { useState } from "react"
import Link from "next/link"
import { mockSemanas } from "../data/mockSemanas"

const semanas = mockSemanas;

export default function MuiSidebar() {
  const [open, setOpen] = useState<string[]>(["Semana 1", "Semana 2"])

  const toggleWeek = (title: string) => {
    setOpen((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    )
  }

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#121212",
          color: "#fff",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto py-3"
        />
        <Typography variant="subtitle2" color="primary" mt={1}>
          21 Days – Julio 2025
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <List>
        {semanas.map((semana) => {
          const isOpen = open.includes(semana.title)
          return (
            <Box key={semana.title}>
              <ListItemButton onClick={() => toggleWeek(semana.title)}>
                <ListItemText primary={semana.title} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {semana.items.map((item, i) => (
                    <Link key={i} href={`/campus/item/${item.id}`} passHref>
                      <ListItemButton component="a" sx={{ pl: 4 }}>
                        <ListItemIcon
                          sx={{
                            minWidth: 24,
                            color: item.done ? "green" : "#ef4444",
                          }}
                        >
                          {item.done ? (
                            <CheckCircle fontSize="small" />
                          ) : (
                            <CancelRounded fontSize="small" />
                          )}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            </Box>
          )
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mt: 2 }} />
      <List>
        <ListItemButton>
          <ListItemText primary="Encuestas" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Material adicional" />
        </ListItemButton>
      </List>
    </Drawer>
  )
}
