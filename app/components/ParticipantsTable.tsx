"use client"

import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material"

type Participant = {
  id: string
  name: string
  email: string
  role: "Gerrer@" | "Equipo"
  lastAccess: string
  avatarUrl: string
}

const participants: Participant[] = [
  {
    id: "1",
    name: "Elena Alonso",
    email: "elena@example.com",
    role: "Gerrer@",
    lastAccess: "Hace 3 horas",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "2",
    name: "Daniel Vidal",
    email: "daniel@example.com",
    role: "Gerrer@",
    lastAccess: "Hace 5 minutos",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    name: "Maria Arnaiz",
    email: "maria@example.com",
    role: "Equipo",
    lastAccess: "Hace 1 día",
    avatarUrl: "https://randomuser.me/api/portraits/women/21.jpg",
  },
]

export default function ParticipantsTable() {
  return (
    <TableContainer
      component={Paper}
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      <Table size="small">
        <TableHead sx={{ backgroundColor: "#1e1e1e" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Nombre / Email</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Rol</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Último acceso</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((p) => (
            <TableRow
              key={p.id}
              hover
              sx={{
                transition: "background 0.2s ease",
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    src={p.avatarUrl}
                    alt={p.name}
                    sx={{
                      width: 40,
                      height: 40,
                      border: "2px solid #e0e0e0",
                    }}
                  />
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {p.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {p.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography
                  variant="caption"
                  sx={{
                    px: 1,
                    py: 0.3,
                    borderRadius: 1,
                    bgcolor: p.role === "Gerrer@" ? "#e0f2f1" : "#e3f2fd",
                    color: p.role === "Gerrer@" ? "#00695c" : "#1565c0",
                    display: "inline-block",
                    fontWeight: 500,
                  }}
                >
                  {p.role}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{p.lastAccess}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
