"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

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
};

export default function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error" as "error" | "success",
  });

  const showSnackbar = (message: string, severity: "error" | "success" = "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.repeatPassword) {
      showSnackbar("Las contraseñas no coinciden");
      return;
    }

    if (!form.termsAccepted) {
      showSnackbar("Debes aceptar los términos y condiciones");
      return;
    }

    try {
      // 1. Registro
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();
        showSnackbar(error.message || "Error al registrar");
        return;
      }

      // 2. Crear sesión de pago
      const paymentRes = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/payment/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 140 }),
      });

      const paymentData = await paymentRes.json();
      if (!paymentData.url) {
        showSnackbar("No se pudo iniciar el pago");
        return;
      }

      // 3. Redirigir a Stripe
      window.location.href = paymentData.url;
    } catch (error) {
      console.error("Error:", error);
      showSnackbar("Error inesperado en el registro o el pago");
    }
  };

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
          maxWidth: { xs: "100%", sm: 600, md: 700, lg: 800 },
          backgroundColor: "#1e1e1e",
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
        }}
      >
        {/* Logo y título */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Image src="/logo.png" alt="Logo Rebirth" width={100} height={100} />
        </Box>
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
          Registro de usuario
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="nombre" label="Nombre" fullWidth required value={form.nombre} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="apellidos" label="Apellidos" fullWidth required value={form.apellidos} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="email" label="Correo electrónico" type="email" fullWidth required value={form.email} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="password" label="Contraseña" type="password" fullWidth required value={form.password} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="repeatPassword" label="Repetir contraseña" type="password" fullWidth required value={form.repeatPassword} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="telefono" label="Teléfono" fullWidth required value={form.telefono} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="dni" label="DNI" fullWidth required value={form.dni} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="direccion" label="Dirección" fullWidth required value={form.direccion} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField name="ciudad" label="Ciudad" fullWidth required value={form.ciudad} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="codigoPostal" label="Código Postal" fullWidth required value={form.codigoPostal} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="pais" label="País" select fullWidth value={form.pais} onChange={handleChange}
                InputLabelProps={{ style: { color: "#ccc" } }} InputProps={{ style: { color: "#fff", backgroundColor: "#2a2a2a" } }}>
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

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{
                mt: 2,
                backgroundColor: "#ef4444",
                color: "#fff",
                fontWeight: "bold",
                ":hover": { backgroundColor: "#dc2626" },
              }}>
                Registrarse y pagar
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Snackbar para feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
