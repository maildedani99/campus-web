"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import Image from "next/image"

interface LoginFormState {
  email: string
  password: string
  remember: boolean
}

const initialState: LoginFormState = {
  email: "",
  password: "",
  remember: false,
}

export default function LoginForm() {
  const [form, setForm] = useState(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })

      const data = await res.json()
      console.log("Login response:", data)
      // Aquí podrías guardar el token, redirigir, etc.
    } catch (error) {
      console.error("Error al hacer login:", error)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: 500,
            md: 600,
            lg: 700,
          },
          backgroundColor: "#1e1e1e",
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
        }}
      >
        {/* Logo + Título */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Image src="/logo.png" alt="Logo Rebirth" width={60} height={60} />
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
            Iniciar sesión
          </Typography>
        </Box>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Correo electrónico"
                type="email"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                    backgroundColor: "#2a2a2a",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Contraseña"
                type="password"
                fullWidth
                required
                value={form.password}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  style: {
                    color: "#fff",
                    backgroundColor: "#2a2a2a",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    sx={{ color: "#fff" }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    Recordarme
                  </Typography>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 1,
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  fontWeight: "bold",
                  ":hover": { backgroundColor: "#dc2626" },
                }}
              >
                Entrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}
