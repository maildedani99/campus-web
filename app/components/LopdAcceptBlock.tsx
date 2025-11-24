'use client';

import { useState } from 'react';
import {
  Stack,
  Button,
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';

export default function LopdAcceptBlock({ onAccepted }: { onAccepted?: () => void }) {
  const [acceptLopd, setAcceptLopd] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const accept = async () => {
    const api = process.env.NEXT_PUBLIC_API_ROUTE!;
    const token = sessionStorage.getItem('token');
    if (!token) {
      setErr('Sesión no disponible');
      return;
    }

    setSubmitting(true);
    setErr(null);
    try {
      const body = {
        marketingConsent: marketing,
        userAgent: navigator.userAgent,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      const res = await fetch(`${api}/contracts/lopd/accept`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || 'No se pudo registrar la aceptación de la LOPD');
      }

      // Refrescar datos de usuario
      const meRes = await fetch(`${api}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const meJson = await meRes.json().catch(() => null);
      const user = meJson?.data ?? meJson;
      if (user) sessionStorage.setItem('user', JSON.stringify(user));

      setOk(true);
      onAccepted?.();
    } catch (e: any) {
      setErr(e?.message || 'Error al aceptar la LOPD');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={2}>
      {ok && (
        <Alert severity="success">
          Has aceptado correctamente la política de protección de datos.
        </Alert>
      )}
      {err && <Alert severity="error">{err}</Alert>}

      <FormControlLabel
        control={
          <Checkbox
            checked={acceptLopd}
            onChange={(e) => setAcceptLopd(e.target.checked)}
          />
        }
        label="He leído y acepto la política de protección de datos."
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
        }
        label="Acepto recibir comunicaciones comerciales relacionadas con Método Rebirth."
      />

      <Button
        variant="contained"
        disabled={!acceptLopd || submitting || ok}
        onClick={accept}
      >
        {submitting ? 'Guardando…' : 'Aceptar y continuar'}
      </Button>
    </Stack>
  );
}
