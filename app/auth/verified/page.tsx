'use client';

import { Box, Typography, Button } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifiedPage() {
  const params = useSearchParams();
  const status = params.get('status');
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 480,
          p: 4,
          borderRadius: 3,
          bgcolor: 'background.paper',
          textAlign: 'center',
          boxShadow: (t) => t.shadows[2],
        }}
      >
        {status === 'success' ? (
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              ¡Correo verificado con éxito!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Tu cuenta ya está activa. Ahora puedes iniciar sesión.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/auth/login')}
            >
              Ir al login
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              Enlace inválido o caducado
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Solicita un nuevo enlace de verificación desde tu cuenta.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push('/auth/login')}
            >
              Volver
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
