"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"
import Image from "next/image"

const initialState = {
  nombre: "",
  apellidos: "",
  email: "",
  password: "",
  repeatPassword: "",
  telefono: "",
  direccion: "",
  ciudad: "",
  codigoPostal: "",
  pais: "España",
  dni: "",
  termsAccepted: false,
}

export default function RegisterForm() {
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
    if (form.password !== form.repeatPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    if (!form.termsAccepted) {
      alert("Debes aceptar los términos y condiciones")
      return
    }

    try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      console.log("Registrado:", data)
    } catch (error) {
      console.error("Error al registrar:", error)
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
            sm: 600,
            md: 700,
            lg: 800,
          },
          backgroundColor: "#1e1e1e",
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
        }}
      >
        {/* Logo y Título */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Image src="/logo.png" alt="Logo Rebirth" width={100} height={100} className="mx-auto" />
        </Box>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold"  }}>
            Registro de usuario
          </Typography>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Nombre y Apellidos */}
            <Grid item xs={12} sm={6}>
              <TextField name="nombre" label="Nombre" fullWidth required value={form.nombre} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="apellidos" label="Apellidos" fullWidth required value={form.apellidos} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField name="email" label="Correo electrónico" type="email" fullWidth required value={form.email} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            {/* Contraseña y repetir */}
            <Grid item xs={12} sm={6}>
              <TextField name="password" label="Contraseña" type="password" fullWidth required value={form.password} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="repeatPassword" label="Repetir contraseña" type="password" fullWidth required value={form.repeatPassword} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            {/* Teléfono y DNI */}
            <Grid item xs={12} sm={6}>
              <TextField name="telefono" label="Teléfono" fullWidth required value={form.telefono} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="dni" label="DNI" fullWidth required value={form.dni} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            {/* Dirección */}
            <Grid item xs={12}>
              <TextField name="direccion" label="Dirección" fullWidth required value={form.direccion} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            {/* Ciudad y CP */}
            <Grid item xs={12} sm={6}>
              <TextField name="ciudad" label="Ciudad" fullWidth required value={form.ciudad} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="codigoPostal" label="Código Postal" fullWidth required value={form.codigoPostal} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            {/* País */}
            <Grid item xs={12}>
              <TextField name="pais" label="País" select fullWidth value={form.pais} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }}>
                <MenuItem value="España">España</MenuItem>
                <MenuItem value="Argentina">Argentina</MenuItem>
                <MenuItem value="México">México</MenuItem>
              </TextField>
            </Grid>

            {/* Aceptar términos */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="termsAccepted"
                    checked={form.termsAccepted}
                    onChange={handleChange}
                    sx={{ color: "#fff" }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    Acepto los términos y condiciones
                  </Typography>
                }
              />
            </Grid>

            {/* Botón */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{
                mt: 2,
                backgroundColor: "#ef4444",
                color: "#fff",
                fontWeight: "bold",
                ":hover": { backgroundColor: "#dc2626" },
              }}>
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}
