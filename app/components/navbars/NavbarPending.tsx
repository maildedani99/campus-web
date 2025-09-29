'use client';

import { AppBar, Toolbar, Box, Button, Menu, MenuItem } from '@mui/material';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthSession } from '@/app/auth/useAuthSession';

export default function NavbarPending() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout, user } = useAuthSession();
  const router = useRouter();

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    router.replace('/auth/login');
  };

  return (
    <AppBar
      position="static" // 👈 para no necesitar layout con márgenes
      sx={{ backgroundColor: '#202120', boxShadow: 2 }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            variant="outlined"
            size="small"
            sx={{
              color: 'white',
              textTransform: 'none',
              borderColor: '#333',
              backgroundColor: '#2d2d2d',
              '&:hover': { backgroundColor: '#3a3a3a' },
            }}
            startIcon={<User size={18} />}
            endIcon={<ChevronDown size={16} />}
          >
            {user?.firstName || 'Usuario'}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { backgroundColor: '#2d2d2d', color: 'white', minWidth: 180 } }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Settings size={16} style={{ marginRight: 8 }} /> Configuración
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogOut size={16} style={{ marginRight: 8 }} /> Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
