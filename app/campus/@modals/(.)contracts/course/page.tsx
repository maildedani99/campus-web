'use client';

import { Stack, Typography, Box } from '@mui/material';
import { COURSE_TEMPLATE } from '../templates/course';
import { useAuthSession } from '@/app/auth/useAuthSession';
import ContractTemplateRenderer from '@/app/components/ContractTemplateRenderer';
import ContractAcceptBlock from '@/app/components/ContractAcceptBlock';
import Modal from '@/app/components/Modal';

export default function CourseContractPage() {
  const { user } = useAuthSession();

  const data = {
    provider: {
      name: 'Método Rebirth',
      legalName: 'PASCUAL MORENO DAVID',
      nif: '77337234X',
      address: 'C/ VALPARAISO Nº 13, OVIEDO',
      phone: '640 636 294',
      email: 'administracion@metodorebirth.com',
    },
    program: {
      name: 'Método Rebirth',
      totalAmount: 699,
      depositAmount: 149,
      balanceAmount: 550,
      refundDays: 15,
    },
    client: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      dni: (user as any)?.dni ?? '',
      birthDate: (user as any)?.birthDate ?? '',
      address: (user as any)?.address ?? '',
      city: (user as any)?.city ?? '',
      province: (user as any)?.province ?? '',
      postalCode: (user as any)?.postalCode ?? '',
      email: user?.email ?? '',
      phone: (user as any)?.phone ?? '',
    },
    consents: {
      marketing: 'NO',
    },
    doc: {
      date: new Date().toLocaleDateString(),
      place: (user as any)?.city || 'Oviedo',
    },
  };

  return (
    <Modal>
      <Stack
        spacing={2}
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Typography variant="h6">Contrato del curso</Typography>

        {/* 👇 Forzamos estilo claro para TODO el contenido del contrato */}
        <Box
          sx={(theme) => ({
            bgcolor: 'background.paper',
            color: theme.palette.text.primary,
            lineHeight: 1.6,
            fontSize: 14,
            // todo lo que pinte dentro se verá oscuro sobre fondo claro
            '& *': {
              color: `${theme.palette.text.primary} !important`,
              backgroundColor: 'transparent !important',
            },
          })}
        >
          <ContractTemplateRenderer template={COURSE_TEMPLATE} data={data} />
        </Box>

        <ContractAcceptBlock
          onAccepted={() => alert('Se ha aceptado el contrato')}
        />
      </Stack>
    </Modal>
  );
}
