'use client';

import { Box, Button, Typography, Stack } from '@mui/material';
import { FileText, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function InactivePage() {
    const router = useRouter();

    return (
        // Este wrapper centra vertical y horizontalmente dentro del <main> del CampusLayout
        <Box
            sx={{
                paddingTop: "75px",
                flex: 1,
                width: '100%',
                display: 'grid',
                placeItems: 'center', // centra en ambos ejes
                px: 2,                // pequeño padding responsivo
            }}
        >
            {/* Caja interna con ancho máximo para el contenido */}
            <Box sx={{ width: '100%', maxWidth: 560, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    ¡Bienvenido al Campus REBIRTH!
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'grey.400' }}>
                    Para activar tu cuenta, por favor revisa y acepta los contratos pendientes
                    y realiza el pago de la reserva.
                </Typography>

                <Stack spacing={2}>
                    <Button
                        component={Link}
                        href="/campus/contracts/course"
                        variant="contained"
                        startIcon={<FileText size={18} />}
                    >
                        Ver contrato
                    </Button>
                    <Button
                        component={Link}
                        href="/campus/contracts"
                        variant="contained"
                        startIcon={<FileText size={18} />}
                    >
                        Ver LOPD
                    </Button>

                    <Button
                        onClick={() => router.push('/campus/payment')}
                        variant="outlined"
                        startIcon={<CreditCard size={18} />}
                    >
                        Realizar pago de reserva
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}
