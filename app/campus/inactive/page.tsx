'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import {
  CreditCard,
  ShieldCheck,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthSession } from '@/app/auth/useAuthSession';
import { fetcher } from '@/app/utils/fetcher';

type Progress = {
  hasPaid: boolean;
  lopdAccepted: boolean;
  contractSigned: boolean;
};

function norm(val?: unknown) {
  return String(val ?? '').trim().toLowerCase();
}

function deriveProgressFromUser(u: any): Progress {
  const deposit = norm(u?.depositStatus);
  const finalPay = norm(u?.finalPayment);
  const hasPaid =
    deposit === 'paid' ||
    deposit === 'completed' ||
    finalPay === 'paid' ||
    finalPay === 'completed';

  const lopdAccepted = Boolean(
    u?.marketingConsent === 1 || u?.marketingConsent === true
  );

  const contractSigned =
    Boolean(u?.contractSigned === 1 || u?.contractSigned === true) ||
    Boolean(u?.contractDate);

  return { hasPaid, lopdAccepted, contractSigned };
}

export default function InactivePage() {
  const theme = useTheme();
  const router = useRouter();
  const { user, token } = useAuthSession();
  const [msg, setMsg] = useState<string>('');
  const [payLoading, setPayLoading] = useState(false);

  const progress = useMemo<Progress>(() => deriveProgressFromUser(user), [user]);

  const startCheckout = async () => {
    if (!token) {
      router.replace('/auth/login');
      return;
    }
    setMsg('');
    setPayLoading(true);
    try {
      const res = await fetcher([
        'stripe/create-checkout',
        'POST',
        { purpose: 'deposit' },
        token,
      ]);
      if (res?.url) {
        window.location.href = res.url;
      } else {
        setMsg('No se pudo iniciar el pago. Inténtalo de nuevo.');
      }
    } catch (e: any) {
      setMsg(e?.message ?? 'Error iniciando el pago.');
    } finally {
      setPayLoading(false);
    }
  };

  const gotoLOPD = () => {
    if (!progress.hasPaid) {
      setMsg('Debes realizar el pago de la reserva antes de aceptar la LOPD.');
      return;
    }
    router.push('/campus/contracts/lopd');
  };

  const gotoContract = () => {
    if (!progress.hasPaid) {
      setMsg('Debes realizar el pago de la reserva antes de avanzar.');
      return;
    }
    if (!progress.lopdAccepted) {
      setMsg('Debes aceptar la LOPD antes de firmar el contrato.');
      return;
    }
    router.push('/campus/contracts/course');
  };

  // 🎨 Tarjeta visual para cada paso
  const StepCard = ({
    icon,
    title,
    description,
    done,
    onClick,
    disabled,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    done: boolean;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <Paper
      elevation={done ? 2 : 1}
      sx={{
        flex: 1,
        p: 3,
        borderRadius: 3,
        backgroundColor: done
          ? alpha(theme.palette.success.light, 0.1)
          : '#fff',
        border: done
          ? `1px solid ${alpha(theme.palette.success.main, 0.3)}`
          : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        opacity: disabled ? 0.9 : 1,
        transition: 'all 0.25s ease',
        '&:hover': {
          transform: disabled ? 'none' : 'translateY(-2px)',
          boxShadow: disabled
            ? undefined
            : '0 3px 10px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              backgroundColor: done
                ? alpha(theme.palette.success.main, 0.15)
                : alpha(theme.palette.error.main, 0.12),
              color: done
                ? theme.palette.success.main
                : theme.palette.error.main,
            }}
          >
            {done ? <CheckCircle2 size={24} /> : icon}
          </Box>

          <Box textAlign="left">
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: done
                  ? theme.palette.success.dark
                  : theme.palette.text.secondary,
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>

        <Button
          variant={done ? 'outlined' : 'contained'}
          color={done ? 'success' : 'error'}
          onClick={onClick}
          disabled={disabled || done}
          sx={{
            whiteSpace: 'nowrap',
            fontWeight: 600,
            px: 2.5,
          }}
        >
          {done ? 'Completado' : 'Ir'}
        </Button>
      </Stack>
    </Paper>
  );

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        backgroundColor: '#f9fafb',
        minHeight: '90vh',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 780, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          Activa tu cuenta REBIRTH
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 3, color: theme.palette.text.secondary }}
        >
          Completa los pasos en orden para activar tu cuenta y acceder al
          contenido del campus.
        </Typography>

        {msg && (
          <Alert
            severity="info"
            onClose={() => setMsg('')}
            sx={{ mb: 3, textAlign: 'left' }}
          >
            {msg}
          </Alert>
        )}

        {/* Cards de progreso */}
        <Stack spacing={2}>
          <StepCard
            icon={<CreditCard size={24} />}
            title="Pago de reserva"
            description={
              progress.hasPaid
                ? 'Pago confirmado.'
                : 'Realiza el pago de reserva para continuar.'
            }
            done={progress.hasPaid}
            onClick={startCheckout}
            disabled={payLoading}
          />

          <StepCard
            icon={<ShieldCheck size={24} />}
            title="Aceptación de LOPD"
            description={
              progress.lopdAccepted
                ? 'LOPD aceptada correctamente.'
                : 'Debe aceptar la política de protección de datos.'
            }
            done={progress.lopdAccepted}
            onClick={gotoLOPD}
            disabled={!progress.hasPaid}
          />

          <StepCard
            icon={<FileText size={24} />}
            title="Firma de contrato"
            description={
              progress.contractSigned
                ? 'Contrato firmado.'
                : 'Firma el contrato para activar tu cuenta.'
            }
            done={progress.contractSigned}
            onClick={gotoContract}
            disabled={!progress.lopdAccepted}
          />
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          Tutor asignado:{' '}
          <strong>{user?.tutor_id ? user.tutor_id : 'Pendiente'}</strong>
        </Typography>
      </Box>
    </Box>
  );
}
