'use client';

import * as React from 'react';
import {
    Avatar,
    Box,
    ButtonBase,
    Divider,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAuthSession } from '@/app/auth/useAuthSession';
import { fetcher } from '@/app/utils/fetcher';
import { useRouter } from 'next/navigation';

type Props = {
    onConfig?: () => void;
};

type ApiUser = {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatarUrl?: string | null;
};

export default function CampusUserMenu({ onConfig }: Props) {

    const router = useRouter();

    const { user: sessionUser, token, logout } = useAuthSession();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [user, setUser] = React.useState<ApiUser | null>(null);
    const open = Boolean(anchorEl);



    const handleLogout = async () => {
        handleClose();
        try {
            await logout();                // limpia token/sesión
        } finally {
            router.replace('/auth/login'); // redirige al login
            router.refresh();              // asegura rehidratación sin sesión
        }
    };

    React.useEffect(() => {
        let mounted = true;
        (async () => {
            if (!token) return;
            try {
                const me = await fetcher(['auth/me', 'GET', null, token]);
                if (mounted) setUser(me as ApiUser);
            } catch {
                // silencioso: se usarán datos del sessionUser como fallback
            }
        })();
        return () => {
            mounted = false;
        };
    }, [token]);

    const fullName =
        (user?.firstName || user?.lastName)
            ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim()
            : (sessionUser?.firstName || sessionUser?.lastName)
                ? `${sessionUser?.firstName ?? ''} ${sessionUser?.lastName ?? ''}`.trim()
                : (sessionUser?.email ?? 'Usuario');

    const email = user?.email ?? sessionUser?.email ?? '';

    const avatarUrl = (user?.avatarUrl ?? sessionUser?.avatarUrl) || undefined;

    const initials = React.useMemo(() => {
        const base = fullName || email || 'U';
        const parts = base.trim().split(/\s+/);
        const first = parts[0]?.[0] ?? '';
        const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
        return (first + last).toUpperCase() || 'U';
    }, [fullName, email]);

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box sx={{ color: 'inherit' }}>
            {/* Trigger (hereda color claro de la AppBar oscura) */}
            <ButtonBase
                onClick={handleOpen}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1,
                    py: 0.5,
                    borderRadius: 999,
                    color: 'inherit',
                    bgcolor: 'transparent',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                }}
            >
                <Avatar
                    src={avatarUrl}
                    alt={fullName || email}
                    sx={{
                        width: 36,
                        height: 36,
                        bgcolor: '#ef4444', // rojo marca
                        color: 'common.white',
                        fontSize: 14,
                        fontWeight: 700,
                    }}
                >
                    {initials}
                </Avatar>

                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        maxWidth: 220,
                        color: 'inherit',
                    }}
                >
                    <Typography variant="body2" noWrap sx={{ lineHeight: 1.1, fontWeight: 600 }}>
                        {fullName}
                    </Typography>
                    {email && (
                        <Typography variant="caption" noWrap sx={{ lineHeight: 1.1, color: 'rgba(255,255,255,0.7)' }}>
                            {email}
                        </Typography>
                    )}
                </Box>

                <ExpandMore sx={{ fontSize: 18, color: 'inherit', display: { xs: 'none', sm: 'inline-flex' } }} />
            </ButtonBase>

            {/* Menú oscuro a juego con la navbar/sidebar */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                elevation={0}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 240,
                        bgcolor: '#2d2d2d',
                        color: 'grey.100',
                        border: '1px solid rgba(255,255,255,0.1)',
                        '& .MuiMenuItem-root': {
                            py: 1,
                            '& svg': { fontSize: 18, mr: 1, color: 'grey.300' },
                        },
                    },
                }}
            >
                <Box sx={{ px: 2, pt: 1, pb: 1 }}>
                    <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
                        {fullName}
                    </Typography>
                    {email && (
                        <Typography variant="caption" noWrap sx={{ color: 'grey.400' }}>
                            {email}
                        </Typography>
                    )}
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

                <MenuItem
                    onClick={() => {
                        handleClose();
                        onConfig?.();
                    }}
                >
                    <Settings /> Configuración
                </MenuItem>

                <MenuItem onClick={handleLogout}>

                    <Logout /> Cerrar sesión
                </MenuItem>
            </Menu>
        </Box>
    );
}
