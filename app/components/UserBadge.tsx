'use client';

import * as React from 'react';
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthSession } from '@/app/auth/useAuthSession';
import { useRouter } from 'next/navigation';

export default function UserBadge() {
  const { user, logout } = useAuthSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const name = user?.firstName
    ? `${user.firstName} ${user?.lastName ?? ''}`.trim()
    : user?.email ?? 'Usuario';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Tooltip title={name}>
        <IconButton onClick={handleOpen} size="small">
          <Avatar sx={{ width: 36, height: 36 }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Typography
        variant="body2"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        {name}
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('/campus/profile');
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mi perfil" />
        </MenuItem>

        <MenuItem
          onClick={async () => {
            handleClose();
            await logout();
            router.replace('/auth/login');
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </MenuItem>
      </Menu>
    </Box>
  );
}
