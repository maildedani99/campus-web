


'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

import { useAuthSession } from '@/app/auth/useAuthSession';
import { fetcher } from '@/app/utils/fetcher';
import DepositStepCard from '@/app/components/DepositStepCard';
import LopdStepCard from '@/app/components/LopdStepCard';
import ContractStepCard from '@/app/components/ContractStepCard';
import ContractTemplateRenderer from '@/app/components/ContractTemplateRenderer';
import ContractAcceptBlock from '@/app/components/ContractAcceptBlock';
import LopdAcceptBlock from '@/app/components/LopdAcceptBlock';
import { LOPD_TEMPLATE } from '../@modals/(.)contracts/templates/lopd';
import { COURSE_TEMPLATE } from '../@modals/(.)contracts/templates/course';

// ✅ ajusta paths si hace falta

type Progress = {
  hasPaid: boolean;
  lopdAccepted: boolean;
  contractSigned: boolean;
};

type ModalKey = null | 'lopd' | 'contract';

function norm(val?: unknown) {
  return String(val ?? '').trim().toLowerCase();
}

function isPaid(raw: any) {
  const s = norm(raw);
  return raw === true || raw === 1 || raw === '1' || s === 'paid' || s === 'completed';
}

function deriveProgressFromUser(u: any): Progress {
  const hasPaid = isPaid(u?.depositStatus) || isPaid(u?.finalPayment);
  const lopdAccepted = u?.marketingConsent === 1 || u?.marketingConsent === true;
  const contractSigned =
    u?.contractSigned === 1 || u?.contractSigned === true || Boolean(u?.contractDate);
  return { hasPaid, lopdAccepted, contractSigned };
}

export default function InactivePage() {
  const theme = useTheme();
  const router = useRouter();

  // Intentamos usar refreshUser/setUser si existen
  const auth = useAuthSession() as any;
  const token = auth?.token;
  const sessionUser = auth?.user;
  const refreshUser = auth?.refreshUser as undefined | (() => Promise<any>);
  const setSessionUser = auth?.setUser as undefined | ((u: any) => void);

  const [user, setUser] = useState<any>(sessionUser);
  const [msg, setMsg] = useState('');
  const [payLoading, setPayLoading] = useState(false);

  const [modal, setModal] = useState<ModalKey>(null);
  const [modalError, setModalError] = useState('');
  const [modalBusy, setModalBusy] = useState(false);

  useEffect(() => {
    setUser(sessionUser);
  }, [sessionUser]);

  const progress = useMemo(() => deriveProgressFromUser(user), [user]);

  const refreshMe = async () => {
    if (!token) return;

    try {
      if (typeof refreshUser === 'function') {
        const me = await refreshUser();
        if (me) setUser(me);
        return;
      }

      // 🔁 AJUSTA si tu endpoint real no es auth/me
      const me = await fetcher(['auth/me', 'GET', undefined, token]);
      if (me) {
        setUser(me);
        if (typeof setSessionUser === 'function') setSessionUser(me);
      }
    } catch {
      // silencioso
    }
  };

  // =========================
  // Cards actions
  // =========================
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
      if (res?.url) window.location.href = res.url;
      else setMsg('No se pudo iniciar el pago. Inténtalo de nuevo.');
    } catch (e: any) {
      setMsg(e?.message ?? 'Error iniciando el pago.');
    } finally {
      setPayLoading(false);
    }
  };

  const openLopd = () => {
    setMsg('');
    if (!progress.hasPaid) {
      setMsg('Debes realizar el pago de la reserva antes de aceptar la LOPD.');
      return;
    }
    setModalError('');
    setModal('lopd');
  };

  const openContract = () => {
    setMsg('');
    if (!progress.hasPaid) {
      setMsg('Debes realizar el pago de la reserva antes de avanzar.');
      return;
    }
    if (!progress.lopdAccepted) {
      setMsg('Debes aceptar la LOPD antes de firmar el contrato.');
      return;
    }
    setModalError('');
    setModal('contract');
  };

  const closeModal = () => {
    if (modalBusy) return;
    setModal(null);
    setModalError('');
  };

  // =========================
  // LOPD data
  // =========================
  const lopdData = useMemo(() => {
    const u = (user || {}) as any;
    return {
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
  }, [user]);

  // =========================
  // CONTRACT data
  // =========================
  const courseData = useMemo(() => {
    const u = (user || {}) as any;
    return {
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
        marketing: 'NO',
      },
      doc: {
        date: new Date().toLocaleDateString(),
        place: u.city || 'Oviedo',
      },
    };
  }, [user]);

  // =========================
  // Hooks from accept blocks
  // =========================
  const onLopdAccepted = async () => {
    // Aquí asumimos que LopdAcceptBlock ya ha guardado en BE
    setModalBusy(true);
    try {
      await refreshMe();
      setModal(null);

      // opcional: abrir contrato automáticamente tras aceptar LOPD
      // setModal('contract');
    } finally {
      setModalBusy(false);
    }
  };

  const onContractAccepted = async () => {
    // Aquí asumimos que ContractAcceptBlock ya ha guardado en BE
    setModalBusy(true);
    try {
      await refreshMe();
      setModal(null);
    } finally {
      setModalBusy(false);
    }
  };

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
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 800, color: theme.palette.text.primary }}>
          Activa tu cuenta REBIRTH
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
          Completa los pasos en orden para activar tu cuenta y acceder al contenido del campus.
        </Typography>

        {msg && (
          <Alert severity="info" onClose={() => setMsg('')} sx={{ mb: 3, textAlign: 'left' }}>
            {msg}
          </Alert>
        )}

        <Stack spacing={2}>
          <DepositStepCard done={progress.hasPaid} loading={payLoading} onClick={startCheckout} />

          <LopdStepCard
            done={progress.lopdAccepted}
            disabled={!progress.hasPaid}
            onClick={openLopd}
          />

          <ContractStepCard
            done={progress.contractSigned}
            disabled={!progress.lopdAccepted}
            onClick={openContract}
          />
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Tutor asignado: <strong>{user?.tutor_id ? user.tutor_id : 'Pendiente'}</strong>
        </Typography>
      </Box>

      {/* =======================
          MODAL LOPD
         ======================= */}
      <Dialog open={modal === 'lopd'} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>Política de protección de datos (LOPD)</DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          {modalError && <Alert severity="error" sx={{ m: 2 }}>{modalError}</Alert>}

          {!user ? (
            <Stack
              spacing={2}
              sx={{ p: 3, alignItems: 'center', justifyContent: 'center', minHeight: 200 }}
            >
              <CircularProgress />
              <Typography>Cargando tus datos...</Typography>
            </Stack>
          ) : (
            <Stack spacing={2} sx={{ p: 3, bgcolor: 'background.paper', color: 'text.primary' }}>
              <Box
                sx={(t) => ({
                  bgcolor: 'background.paper',
                  color: t.palette.text.primary,
                  lineHeight: 1.6,
                  fontSize: 14,
                  '& *': {
                    color: `${t.palette.text.primary} !important`,
                    backgroundColor: 'transparent !important',
                  },
                })}
              >
                <ContractTemplateRenderer template={LOPD_TEMPLATE} data={lopdData} />
              </Box>

              <LopdAcceptBlock onAccepted={onLopdAccepted} />
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal} disabled={modalBusy}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* =======================
          MODAL CONTRATO
         ======================= */}
      <Dialog open={modal === 'contract'} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle>Contrato del curso</DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          {modalError && <Alert severity="error" sx={{ m: 2 }}>{modalError}</Alert>}

          {!user ? (
            <Stack
              spacing={2}
              sx={{ p: 3, alignItems: 'center', justifyContent: 'center', minHeight: 200 }}
            >
              <CircularProgress />
              <Typography>Cargando tus datos...</Typography>
            </Stack>
          ) : (
            <Stack spacing={2} sx={{ p: 3, bgcolor: 'background.paper', color: 'text.primary' }}>
              <Box
                sx={(t) => ({
                  bgcolor: 'background.paper',
                  color: t.palette.text.primary,
                  lineHeight: 1.6,
                  fontSize: 14,
                  '& *': {
                    color: `${t.palette.text.primary} !important`,
                    backgroundColor: 'transparent !important',
                  },
                })}
              >
                <ContractTemplateRenderer template={COURSE_TEMPLATE} data={courseData} />
              </Box>

              <ContractAcceptBlock onAccepted={onContractAccepted} />
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal} disabled={modalBusy}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
