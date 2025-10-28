'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography, Alert,
} from '@mui/material';
import Image from 'next/image';
import { fetcher } from '@/app/utils/fetcher';
import { useAuthSession } from '@/app/auth/useAuthSession';
import Link from 'next/link';

type LoginFormState = { email: string; password: string; remember: boolean; };
const initialState: LoginFormState = { email: '', password: '', remember: false };

export default function LoginPage() {
  const [form, setForm] = useState<LoginFormState>(initialState);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setSession } = useAuthSession();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);

    try {
      // 1) Login → token
      const loginRes = await fetcher([
        'auth/login',
        'POST',
        { email: form.email.trim(), password: form.password },
      ]);

      const token =
        loginRes?.data?.token ??
        loginRes?.token ??
        loginRes?.access_token ??
        null;

      if (!token) throw new Error('No se recibió token del login');

      // 2) /me → usuario
      const meRes = await fetcher(['auth/me', 'GET', null, token]);
      const user = meRes?.data ?? meRes;
      if (!user) throw new Error('No se pudo obtener el usuario');

      // 3) Guardar sesión usando el hook (normalize + remember)
      setSession({ token, user, remember: form.remember });

      // 4) DEMO: ir siempre a /campus/inactive
      router.replace('/campus/inactive');
    } catch (err: any) {
      if (err?.status === 401) setError('Credenciales incorrectas');
      else if (err?.status === 422) {
        const first =
          typeof err?.errors === 'object'
            ? (Object.values(err.errors)[0] as any)?.[0] ?? 'Datos inválidos'
            : 'Datos inválidos';
        setError(first);
      } else setError(err?.message ?? 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.100',
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
          maxWidth: { xs: '100%', sm: 480, md: 520 },
          bgcolor: 'background.paper',
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
          border: (t) => `1px solid ${t.palette.divider}`,
          boxShadow: (t) => t.shadows[2],
        }}
      >
       <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // 👈 separa logo y texto
    mb: 3,
  }}
>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Iniciar sesión
          </Typography>
          <Image src="/logo-inverse.png" alt="Logo Rebirth" width={100} height={100} />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
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
                autoComplete="email"
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
                autoComplete="current-password"
              />
            </Grid>

           

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 1 }}
              >
                {loading ? 'Entrando…' : 'Entrar'}
              </Button>
            </Grid>
          </Grid>
        </form>

      
        <Typography
                variant="body1"
                sx={{
                  mt: 4,
                  mb: 2,
                  textAlign: 'center',
                  color: 'text.primary',
                  fontWeight: 500,
                }}
              >
                ¿No tienes cuenta?{' '}
                <a
                  href="/auth/register"
                  style={{
                    color: '#D60001',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#b91c1c')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#D60001')}
                >
                  Regístrate
                </a>
              </Typography>

        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: 'text.secondary' }}>
          <Link href="/forgot-password" style={{ color: 'inherit', textDecoration: 'underline' }}>
            ¿Olvidaste tu contraseña?
          </Link>
        </Typography>
      </Box>
    </Box>
  );

}
