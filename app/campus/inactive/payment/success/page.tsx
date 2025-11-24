'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Typography, CircularProgress } from '@mui/material';

// Evita que Next intente prerender estáticamente esta página
export const dynamic = 'force-dynamic';

function PaymentSuccessInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    // Aquí podrías llamar a una API si quisieras validar algo con sessionId.
    // Por ahora, simplemente redirigimos al campus cuando hay sessionId.
    router.replace('/campus');
  }, [sessionId, router]);

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h5" component="h1">
        Procesando tu pago...
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Un momento, por favor. Te redirigimos automáticamente al campus.
      </Typography>
      <CircularProgress />
    </Box>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            p: 4,
            minHeight: '40vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h5">Cargando...</Typography>
          <CircularProgress />
        </Box>
      }
    >
      <PaymentSuccessInner />
    </Suspense>
  );
}
