'use client';

import { Box, Button, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

export default function SessionExpiredPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '#fafafa',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 420,
          borderRadius: 3,
          background: '#fff',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <AlertTriangle size={42} color="#ef4444" />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Sesión expirada
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          Tu sesión ha expirado por seguridad. Por favor, inicia sesión de nuevo
          para continuar.
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={() => router.push('/auth/login')}
          sx={{ fontWeight: 600, py: 1 }}
        >
          Iniciar sesión
        </Button>
      </Paper>
    </Box>
  );
}
