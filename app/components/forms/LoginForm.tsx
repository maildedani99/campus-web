'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import Image from 'next/image';
import { fetcher } from '@/app/utils/fetcher';

type LoginFormState = {
  email: string;
  password: string;
  remember: boolean;
};

const initialState: LoginFormState = {
  email: '',
  password: '',
  remember: false,
};

export default function LoginFormCampus() {
  const [form, setForm] = useState<LoginFormState>(initialState);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);

    try {
      // 1. login → devuelve solo token
      const loginRes = await fetcher(['auth/login', 'POST', {
        email: form.email,
        password: form.password,
      }]);

      const token = loginRes?.data?.token ?? loginRes?.token;
      if (!token) throw new Error('No se recibió token del login');

      // 2. pedir usuario autenticado
      const meRes = await fetcher(['auth/me', 'POST', null, token]);
      const user = meRes?.data ?? meRes;
      if (!user) throw new Error('No se pudo obtener el usuario');

      // 3. persistencia
      const storage = form.remember ? localStorage : sessionStorage;
      storage.setItem('token', token);
      storage.setItem('user', JSON.stringify(user));

      // 4. routing por rol
      const role = user?.role as 'admin' | 'teacher' | 'client' | undefined;
      const isActive = Boolean(user?.isActive);

      if (role === 'admin') router.replace('/campus/admin');
      else if (role === 'teacher') router.replace('/campus/teacher');
      else router.replace('/campus');
    } catch (err: any) {
      if (err?.status === 401) setError('Credenciales incorrectas');
      else if (err?.status === 422) {
        const first =
          typeof err?.errors === 'object'
            ? Object.values(err.errors)[0]?.[0] ?? 'Datos inválidos'
            : 'Datos inválidos';
        setError(first);
      } else {
        setError(err?.message ?? 'Error al iniciar sesión');
      }
    } finally {
      setLoading(false);
    }
  };

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

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
                InputLabelProps={{ style: { color: '#ccc' } }}
                InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }}
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
                InputProps={{ style: { color: '#fff', backgroundColor: '#2a2a2a' } }}
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
                label={<Typography variant="body2" sx={{ color: '#ccc' }}>Recordarme</Typography>}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 1,
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  fontWeight: 'bold',
                  ':hover': { backgroundColor: '#dc2626' },
                }}
              >
                {loading ? 'Entrando…' : 'Entrar'}
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

        <Typography variant="body2" sx={{ color: '#aaa', mt: 3, textAlign: 'center' }}>
          <a href="/forgot-password" style={{ color: '#aaa', textDecoration: 'underline' }}>
            ¿Olvidaste tu contraseña?
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
