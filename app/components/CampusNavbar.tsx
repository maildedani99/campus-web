'use client';

import * as React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import CampusUserMenu from './CampusUserMenu';

export default function CampusNavbar() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        bgcolor: 'grey.900',      // barra oscura
        color: 'grey.100',        // texto claro
        borderBottom: '1px solid',
        borderColor: 'grey.800',
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: 64 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'inherit' }}>
          REBIRTH Campus
        </Typography>

        <Box sx={{ flex: 1 }} />

        <CampusUserMenu />
      </Toolbar>
    </AppBar>
  );
}
