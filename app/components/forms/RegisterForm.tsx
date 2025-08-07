'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'

interface RegisterFormState {
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  dni: string
  termsAccepted: boolean
}

const initialState: RegisterFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repeatPassword: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'España',
  dni: '',
  termsAccepted: false,
}

export default function RegisterForm() {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.repeatPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (!form.termsAccepted) {
      setError('Debes aceptar los términos y condiciones')
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Error en el registro')

      const user = await res.json()

      const stripeRes = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/payment/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 100 }),
      })

      const session = await stripeRes.json()

      if (session?.url) {
        window.location.href = session.url
      } else {
        throw new Error('Error al iniciar el pago')
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al procesar el registro o el pago.')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: {
            xs: '100%',
            sm: 600,
            md: 700,
            lg: 800,
          },
          backgroundColor: '#1e1e1e',
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Image src="/logo.png" alt="Logo Rebirth" width={100} height={100} />
        </Box>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
          Registro de usuario
        </Typography>

        {error && (
          <Typography sx={{ color: 'red', mt: 2 }}>{error}</Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="firstName" label="Nombre" fullWidth required value={form.firstName} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="lastName" label="Apellidos" fullWidth required value={form.lastName} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="email" label="Correo electrónico" type="email" fullWidth required value={form.email} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="password" label="Contraseña" type="password" fullWidth required value={form.password} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="repeatPassword" label="Repetir contraseña" type="password" fullWidth required value={form.repeatPassword} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="phone" label="Teléfono" fullWidth required value={form.phone} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="dni" label="DNI" fullWidth required value={form.dni} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="address" label="Dirección" fullWidth required value={form.address} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="city" label="Ciudad" fullWidth required value={form.city} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="postalCode" label="Código Postal" fullWidth required value={form.postalCode} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="country" label="País" select fullWidth value={form.country} onChange={handleChange}
                InputLabelProps={{ style: { color: '#ccc' } }} InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }}>
                <MenuItem value="España">España</MenuItem>
                <MenuItem value="Argentina">Argentina</MenuItem>
                <MenuItem value="México">México</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="termsAccepted"
                    checked={form.termsAccepted}
                    onChange={handleChange}
                    sx={{ color: '#fff' }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
                    Acepto los términos y condiciones
                  </Typography>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{
                mt: 2,
                backgroundColor: '#ef4444',
                color: '#fff',
                fontWeight: 'bold',
                ':hover': { backgroundColor: '#dc2626' },
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
