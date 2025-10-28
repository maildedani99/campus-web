'use client';

import * as React from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import CampusNavbar from '../components/CampusNavbar';
import CampusSidebar from '../components/CampusSidebar';

export default function CampusLayout({
  children,
  modals,
}: {
  children: React.ReactNode;
  modals: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' /* sin bgcolor */ }}>
      {/* Barras fijas */}
      <CampusNavbar />
      <CampusSidebar />

      {/* Contenido sin fondo, sin padding, sin container */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'auto',
          /* sin bgcolor ni padding: que decida cada page */
        }}
      >
        {/* Separador por AppBar fija */}
        <Toolbar />
        {/* Render directo */}
        {children}
        {modals}
      </Box>
    </Box>
  );
}
