"use client"

import { useMemo, useState } from "react"
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { useRouter } from "next/navigation"
import { CLIENTS } from "@/app/data/clients"


type Client = {
  id: string
  name: string
  email: string
  lastAccess: string
  avatarUrl: string
}


export default function ClientsTable() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return CLIENTS
    return CLIENTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <Paper elevation={3} sx={{ p: 2.5, borderRadius: 3 }}>
      {/* Header: título + acciones */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ flex: "1 1 auto" }}>
          Clientes
        </Typography>

        <TextField
          size="small"
          placeholder="Buscar por nombre o email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: { xs: "100%", sm: 280 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("Acción: crear nuevo cliente")}
        >
          Nuevo cliente
        </Button>
      </Box>

      {/* Tabla */}
      <TableContainer sx={{ maxHeight: 540, borderRadius: 2 }}>
        <Table stickyHeader size="small" aria-label="clients table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  bgcolor: "#f6f7f9",
                  color: "text.primary",
                  fontWeight: 700,
                },
              }}
            >
              <TableCell>Nombre / Email</TableCell>
              <TableCell align="right">Último acceso</TableCell>
              <TableCell align="right" width={56}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((c, idx) => {
              const zebra = idx % 2 === 1
              return (
                <TableRow
                  key={c.id}
                  hover
                  onClick={() => router.push(`/cLientView/${c.id}`)}
                  sx={{
                    cursor: "pointer",
                    bgcolor: zebra ? "rgba(0,0,0,0.015)" : "transparent",
                    transition: "background 0.2s ease",
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar
                        src={c.avatarUrl}
                        alt={c.name}
                        sx={{ width: 44, height: 44, border: "2px solid #eceff1" }}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {c.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {c.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="right">
                    <Typography variant="body2">{c.lastAccess}</Typography>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      size="small"
                      aria-label="ver"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/campus/admin/clients/${c.id}`)
                      }}
                    >
                      <ChevronRightIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ py: 3 }}
                  >
                    No se encontraron clientes para “{query}”.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
