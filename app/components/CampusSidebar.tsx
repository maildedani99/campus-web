'use client';

import * as React from 'react';
import { Drawer, Toolbar, Box } from '@mui/material';
import Image from 'next/image';

const DRAWER_WIDTH = 240;

export default function CampusSidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    bgcolor: 'grey.900',       // igual que la navbar
                    color: 'grey.100',
                    borderRight: '1px solid',
                    borderColor: 'grey.800',
                },
            }}
        >

            <Box
                sx={{
                    px: 2,
                    py: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    src="/logo.png"
                    alt="REBIRTH"
                    width={120}
                    height={36}
                    priority
                />
            </Box>

            {/* espacio vacío (sin menú) */}
            <Box sx={{ flex: 1 }} />
        </Drawer>
    );
}
