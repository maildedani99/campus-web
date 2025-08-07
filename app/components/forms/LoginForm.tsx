'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'

interface LoginFormState {
  email: string
  password: string
  remember: boolean
}

const initialState: LoginFormState = {
  email: '',
  password: '',
  remember: false,
}

export default function LoginForm() {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')
  const router = useRouter()

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

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })

      if (!res.ok) {
        throw new Error('Credenciales incorrectas')
      }

      const data = await res.json()
      if (!data?.user?.role) {
        throw new Error('No se ha recibido el rol del usuario')
      }

      const role = data.user.role

      if (role === 'admin') router.push('/admin')
      else if (role === 'teacher') router.push('/teacher')
      else router.push('/campus')
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
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
          maxWidth: { xs: '100%', sm: 480, md: 500 },
          backgroundColor: '#1e1e1e',
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Image src="/logo.png" alt="Logo Rebirth" width={50} height={50} />
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Iniciar sesión
          </Typography>
        </Box>

        {error && (
          <Typography sx={{ color: 'red', mb: 2 }}>{error}</Typography>
        )}

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
                InputLabelProps={{ style: { color: '#ccc' } }}
                InputProps={{
                  style: {
                    color: '#fff',
                    backgroundColor: '#2a2a2a',
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
                InputLabelProps={{ style: { color: '#ccc' } }}
                InputProps={{
                  style: {
                    color: '#fff',
                    backgroundColor: '#2a2a2a',
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
                    sx={{ color: '#fff' }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#ccc' }}>
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
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  fontWeight: 'bold',
                  ':hover': { backgroundColor: '#dc2626' },
                }}
              >
                Entrar
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box
          sx={{
            mt: 5,
            p: 3,
            border: '1px solid #ef4444',
            borderRadius: 2,
            textAlign: 'center',
            backgroundColor: '#1a1a1a',
          }}
        >
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
            ¿Nuevo cliente?
          </Typography>
          <Typography variant="body2" sx={{ color: '#ccc', mb: 2 }}>
            Reserva tu plaza y accede al campus con un primer pago.
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => router.push('/auth/register')}
            sx={{ fontWeight: 'bold' }}
          >
            Registrarme ahora
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ color: '#aaa', mt: 3, textAlign: 'center' }}
        >
          <a href="/forgot-password" style={{ color: '#aaa', textDecoration: 'underline' }}>
            ¿Olvidaste tu contraseña?
          </a>
        </Typography>
      </Box>
    </Box>
  )
}
