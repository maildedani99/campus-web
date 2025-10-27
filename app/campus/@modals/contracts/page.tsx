'use client';

import { Box, Typography } from '@mui/material';

export default function ContractsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Contratos</Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'grey.400' }}>
        Revisa tus contratos pendientes y acéptalos para activar tu cuenta.
      </Typography>
    </Box>
  );
}
