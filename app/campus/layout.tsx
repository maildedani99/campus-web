'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItemButton,
  ListItemText, ListItemIcon, CircularProgress, Avatar, Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import SidebarClient from '../components/sidebars/SidebarClient';
import NavbarClient from '../components/navbars/NavbarClient';

type User = {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: 'admin' | 'teacher' | 'client';
  isActive?: boolean;
};

const DRAWER_WIDTH = 240;

const NAV = [
  { href: '/campus', label: 'Inicio', icon: <DashboardIcon /> },
  { href: '/campus/courses', label: 'Cursos', icon: <SchoolIcon /> },
  { href: '/campus/payments', label: 'Pagos', icon: <ReceiptLongIcon /> },
  { href: '/campus/profile', label: 'Mi perfil', icon: <PersonIcon /> },
];

export default function CampusLayout({
  children,
  modals,                 // 👈 recibe el slot paralelo
}: {
  children: ReactNode;
  modals: ReactNode;      // 👈 tipado del slot
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const rawUser = sessionStorage.getItem('user') || localStorage.getItem('user');
      if (!token || !rawUser) {
        router.replace('/auth/login');
        return;
      }
      setUser(JSON.parse(rawUser) as User);
      setReady(true);
    } catch {
      router.replace('/auth/login');
    }
  }, [router]);

  const isActive = (href: string) =>
    href === '/campus' ? pathname === '/campus' : pathname?.startsWith(href);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch {}
    router.replace('/auth/login');
  };

  if (!ready) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: '#121212' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', bgcolor: '#0f0f0f', color: '#fff' }}>
      {/* Sidebar fijo */}
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            bgcolor: '#151515',
            color: '#fff',
            borderRight: '1px solid #222',
          },
        }}
        sx={{ width: DRAWER_WIDTH, flexShrink: 0 }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar src="/logo.png" alt="Logo" sx={{ width: 40, height: 40 }} />
          <Box>
            <Typography sx={{ fontWeight: 700, lineHeight: 1 }}>Rebirth</Typography>
            <Typography variant="caption" sx={{ color: '#aaa' }}>Campus</Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: '#222' }} />

        <List sx={{ px: 1 }}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <ListItemButton
                selected={isActive(item.href)}
                sx={{
                  borderRadius: 1,
                  my: 0.5,
                  '&.Mui-selected': { bgcolor: '#222' },
                  '&:hover': { bgcolor: '#1d1d1d' },
                }}
              >
                <ListItemIcon sx={{ color: '#bbb', minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ sx: { color: '#eee', fontSize: 14 } }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>

        <SidebarClient handleLogout={handleLogout} />
      </Drawer>

      {/* Main */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {/* Topbar (fixed) alineado con el sidebar */}
        <NavbarClient drawerWidth={DRAWER_WIDTH} />

        {/* Spacer para que el contenido no quede debajo del AppBar fijo */}
        <Toolbar />

        {/* Content */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>

      {/* 🔳 Slot para los modales de /campus/@modals */}
      <Box
        id="modal-slot"
        sx={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none', // el modal interior reactivará eventos
          zIndex: (t) => t.zIndex.modal, // por encima del AppBar y Drawer
        }}
      >
        {/* el contenido de cada página en /campus/@modals montará su propio <Modal/> */}
        {modals}
      </Box>
    </Box>
  );
}
