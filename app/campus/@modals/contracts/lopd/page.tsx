'use client';

import { Stack, Typography, Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useAuthSession } from '@/app/auth/useAuthSession';
import Modal from '@/app/components/Modal';
import ContractTemplateRenderer from '@/app/components/ContractTemplateRenderer';
import { LOPD_TEMPLATE } from '../templates/lopd';
import LopdAcceptBlock from '@/app/components/LopdAcceptBlock';

export default function LopdContractPage() {
  const router = useRouter();
  const { user } = useAuthSession() as { user: any | null };

  const u = (user || {}) as any;

  const data = {
    provider: {
      name: 'Método Rebirth',
      legalName: 'PASCUAL MORENO DAVID',
      nif: '77337234X',
      address: 'C/ VALPARAISO Nº 13, OVIEDO',
      phone: '640 636 294',
      email: 'administracion@metodorebirth.com',
    },
    client: {
      firstName: u.firstName ?? '',
      lastName: u.lastName ?? '',
      dni: u.dni ?? '',
      birthDate: u.birthDate ?? '',
      address: u.address ?? '',
      city: u.city ?? '',
      province: u.province ?? '',
      postalCode: u.postalCode ?? '',
      email: u.email ?? '',
      phone: u.phone ?? '',
    },
    consents: {
      marketing: u.marketingConsent ? 'SI' : 'NO',
    },
    doc: {
      date: new Date().toLocaleDateString(),
      place: u.city || 'Oviedo',
    },
  };

  return (
    <Modal>
      {!user ? (
        <Stack
          spacing={2}
          sx={{
            p: 3,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
          }}
        >
          <CircularProgress />
          <Typography>Cargando tus datos...</Typography>
        </Stack>
      ) : (
        <Stack
          spacing={2}
          sx={{
            p: 3,
            bgcolor: 'background.paper',
            color: 'text.primary',
          }}
        >
          <Typography variant="h6">
            Política de protección de datos (LOPD)
          </Typography>

          <Box
            sx={(theme) => ({
              bgcolor: 'background.paper',
              color: theme.palette.text.primary,
              lineHeight: 1.6,
              fontSize: 14,
              '& *': {
                color: `${theme.palette.text.primary} !important`,
                backgroundColor: 'transparent !important',
              },
            })}
          >
            <ContractTemplateRenderer template={LOPD_TEMPLATE} data={data} />
          </Box>

          <LopdAcceptBlock
            // aquí decides el siguiente paso: contrato del curso o volver al campus
            onAccepted={() => router.push('/campus/contracts/course')}
            // o: onAccepted={() => router.push('/campus')}
          />
        </Stack>
      )}
    </Modal>
  );
}
