'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box, Button, Checkbox, FormControlLabel, Grid, MenuItem,
  TextField, Typography, Alert,
} from '@mui/material';
import Image from 'next/image';

type RegisterFormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  province: string;      // 👈 nuevo
  birthDate: string;     // 👈 nuevo (yyyy-mm-dd)
  dni: string;
  termsAccepted: boolean;
  marketingConsent: boolean; // 👈 opcional
};

type FieldErrors = Partial<Record<keyof RegisterFormState | 'password_confirmation', string>>;

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
  province: '',          // 👈
  birthDate: '',         // 👈
  dni: '',
  termsAccepted: false,
  marketingConsent: false, // 👈
};

const COUNTRIES = ['España', 'Argentina', 'México'];

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FieldErrors>({});
  const [topError, setTopError] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target as HTMLInputElement;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [name]: value } as RegisterFormState));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
    setTopError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setTopError('');
    setSuccessMsg('');
    setFormErrors({});

    // Validaciones rápidas en cliente
    if (form.password !== form.repeatPassword) {
      setFormErrors((p) => ({ ...p, repeatPassword: 'Las contraseñas no coinciden' }));
      return;
    }
    if (!form.termsAccepted) {
      setFormErrors((p) => ({ ...p, termsAccepted: 'Debes aceptar los términos' }));
      return;
    }

    setLoading(true);
    try {
      const api = process.env.NEXT_PUBLIC_API_ROUTE;
      if (!api) throw new Error('Falta NEXT_PUBLIC_API_ROUTE');

      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        password_confirmation: form.repeatPassword, // Laravel
        phone: form.phone.replace(/\s+/g, ''),
        address: form.address.trim(),
        city: form.city.trim(),
        postalCode: form.postalCode.trim(),
        country: form.country,
        province: form.province.trim(),     // 👈 nuevo
        birthDate: form.birthDate,          // 👈 nuevo (yyyy-mm-dd)
        dni: form.dni.trim().toUpperCase(),
        marketingConsent: form.marketingConsent, // 👈 opcional
      };

      const res = await fetch(`${api}/auth/register`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || (json && json.success === false)) {
        if (res.status === 422 && json?.errors && typeof json.errors === 'object') {
          const fe: FieldErrors = {};
          Object.entries(json.errors).forEach(([k, v]) => {
            const msg = Array.isArray(v) ? String(v[0]) : String(v);
            if (k === 'password') fe.password = msg;
            else if (k === 'password_confirmation') fe.repeatPassword = msg;
            else if (k in initialState) (fe as any)[k] = msg;
          });
          setFormErrors(fe);
          setTopError(json?.message || 'Datos inválidos');
        } else {
          const msg = json?.message || 'Error en el registro';
          setTopError(msg);
        }
        return;
      }

      const token = json?.data?.token ?? json?.token;
      const user  = json?.data?.user  ?? json?.user;

      if (token && user) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      setSuccessMsg('Registro completado. ¡Bienvenido/a!');
      setForm(initialState);
      // Redirección si quieres:
      // window.location.href = '/campus';
    } catch (err: any) {
      setTopError(err?.message || 'Ocurrió un error al registrar.');
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
        maxWidth: { xs: '100%', sm: 600, md: 700, lg: 800 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        p: { xs: 3, sm: 4 },
        border: (t) => `1px solid ${t.palette.divider}`,
        boxShadow: (t) => t.shadows[2],
      }}
    >
      {/* Cabecera: título a la izq, logo a la dcha */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
          Registro de usuario
        </Typography>
        <Image src="/logo-inverse.png" alt="Logo Rebirth" width={100} height={100} />
      </Box>

      {topError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {topError}
        </Alert>
      )}
      {successMsg && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="Nombre"
              fullWidth
              required
              value={form.firstName}
              onChange={handleChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Apellidos"
              fullWidth
              required
              value={form.lastName}
              onChange={handleChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
              autoComplete="family-name"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="email"
              label="Correo electrónico"
              type="email"
              fullWidth
              required
              value={form.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              autoComplete="email"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="password"
              label="Contraseña"
              type="password"
              fullWidth
              required
              value={form.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              autoComplete="new-password"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="repeatPassword"
              label="Repetir contraseña"
              type="password"
              fullWidth
              required
              value={form.repeatPassword}
              onChange={handleChange}
              error={!!formErrors.repeatPassword}
              helperText={formErrors.repeatPassword}
              autoComplete="new-password"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              label="Teléfono"
              fullWidth
              required
              value={form.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              autoComplete="tel"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="dni"
              label="DNI/NIE"
              fullWidth
              required
              value={form.dni}
              onChange={handleChange}
              error={!!formErrors.dni}
              helperText={formErrors.dni}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="birthDate"
              label="Fecha de nacimiento"
              type="date"
              fullWidth
              required
              value={form.birthDate}
              onChange={handleChange}
              error={!!formErrors.birthDate}
              helperText={formErrors.birthDate}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="province"
              label="Provincia"
              fullWidth
              required
              value={form.province}
              onChange={handleChange}
              error={!!formErrors.province}
              helperText={formErrors.province}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="address"
              label="Dirección"
              fullWidth
              required
              value={form.address}
              onChange={handleChange}
              error={!!formErrors.address}
              helperText={formErrors.address}
              autoComplete="street-address"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              label="Ciudad"
              fullWidth
              required
              value={form.city}
              onChange={handleChange}
              error={!!formErrors.city}
              helperText={formErrors.city}
              autoComplete="address-level2"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="postalCode"
              label="Código Postal"
              fullWidth
              required
              value={form.postalCode}
              onChange={handleChange}
              error={!!formErrors.postalCode}
              helperText={formErrors.postalCode}
              autoComplete="postal-code"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="country"
              label="País"
              select
              fullWidth
              value={form.country}
              onChange={handleChange}
              error={!!formErrors.country}
              helperText={formErrors.country}
            >
              {COUNTRIES.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* ❌ Eliminado: checkbox de marketingConsent */}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                />
              }
              label={<Typography variant="body2">Acepto los términos y condiciones</Typography>}
            />
            {!!formErrors.termsAccepted && (
              <Typography variant="caption" color="error">
                {formErrors.termsAccepted}
              </Typography>
            )}
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
              {loading ? 'Procesando…' : 'Registrarse'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* CTA para volver al login */}
      <Typography
        variant="body1"
        sx={{
          mt: 4,
          textAlign: 'center',
          color: 'text.primary',
          fontWeight: 500,
        }}
      >
        ¿Ya tienes cuenta?{' '}
        <a
          href="/auth/login"
          style={{
            color: '#D60001',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'color 0.25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#b91c1c')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#D60001')}
        >
          Inicia sesión
        </a>
      </Typography>
    </Box>
  </Box>
);

}
