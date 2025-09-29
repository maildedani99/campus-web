'use client';

import { useState } from 'react';
import { Stack, Button, Checkbox, FormControlLabel, Alert } from '@mui/material';

export default function ContractAcceptBlock({ onAccepted }: { onAccepted?: () => void }) {
  const [checked, setChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const accept = async () => {
    const api = process.env.NEXT_PUBLIC_API_ROUTE!;
    const token = sessionStorage.getItem('token');
    if (!token) { setErr('Sesión no disponible'); return; }

    setSubmitting(true);
    setErr(null);
    try {
      const body = {
        // metadatos extra que el BE puede registrar si quiere
        userAgent: navigator.userAgent,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      const res = await fetch(`${api}/contracts/course/accept`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || 'No se pudo aceptar el contrato');
      }

      // opcional: refresca "me" y guarda en storage si lo usas
      const meRes = await fetch(`${api}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const meJson = await meRes.json().catch(() => null);
      const user = meJson?.data ?? meJson;
      if (user) sessionStorage.setItem('user', JSON.stringify(user));

      setOk(true);
      onAccepted?.();
    } catch (e: any) {
      setErr(e?.message || 'Error al aceptar el contrato');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={2}>
      {ok && <Alert severity="success">Contrato aceptado correctamente.</Alert>}
      {err && <Alert severity="error">{err}</Alert>}

      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
        label="He leído y acepto el contrato."
      />

      <Button variant="contained" disabled={!checked || submitting || ok} onClick={accept}>
        {submitting ? 'Guardando…' : 'Aceptar contrato'}
      </Button>
    </Stack>
  );
}
