'use client';

import { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button, Alert, Skeleton } from '@mui/material';

type ContractStatus = 'issued' | 'accepted' | 'declined';

type ContractDetail = {
  id: string;
  title: string;
  status: ContractStatus;
  renderedHtml?: string;      // HTML ya renderizado del contrato
  pdfUrl?: string | null;     // URL al PDF (si existe)
  issuedAt?: string;
  acceptedAt?: string | null;
};

type Props = {
  contractId: string;
  /** Si quieres sobreescribir el fetch (tests o mock), pásalo aquí */
  loader?: (id: string) => Promise<ContractDetail>;
};

export default function ContractView({ contractId, loader }: Props) {
  const [data, setData] = useState<ContractDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = loader
          ? await loader(contractId)
          : await defaultLoad(contractId);
        if (!alive) return;
        setData(res);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message || 'No se pudo cargar el contrato.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [contractId, loader]);

  // Loading state
  if (loading) {
    return (
      <Stack spacing={2}>
        <Skeleton variant="text" width={320} height={32} />
        <Skeleton variant="rounded" height={240} />
      </Stack>
    );
  }

  // Error / Not found
  if (error || !data) {
    return <Alert severity="error">{error || 'Contrato no encontrado.'}</Alert>;
  }

  return (
    <Stack spacing={2}>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ mr: 2 }}>
          {data.title}
        </Typography>

        {data.pdfUrl && (
          <Button
            component="a"
            href={data.pdfUrl}
            target="_blank"
            rel="noopener"
            variant="outlined"
          >
            Descargar PDF
          </Button>
        )}
      </Stack>

      {/* Metadata opcional */}
      <Typography variant="caption" sx={{ color: 'grey.500' }}>
        Estado: {prettyStatus(data.status)}
        {data.issuedAt ? ` · Emitido: ${fmtDateTime(data.issuedAt)}` : ''}
        {data.acceptedAt ? ` · Aceptado: ${fmtDateTime(data.acceptedAt)}` : ''}
      </Typography>

      {/* Cuerpo del contrato (HTML renderizado) */}
      {data.renderedHtml ? (
        <Box
          sx={{
            p: 2,
            bgcolor: '#111',
            border: '1px solid #222',
            borderRadius: 1,
            lineHeight: 1.6,
          }}
          dangerouslySetInnerHTML={{ __html: data.renderedHtml }}
        />
      ) : (
        <Alert severity="info">
          Este contrato no tiene vista HTML disponible.
        </Alert>
      )}
    </Stack>
  );
}

/* -------- helpers -------- */

async function defaultLoad(id: string): Promise<ContractDetail> {
  const res = await fetch(`/api/contracts/${id}`, { cache: 'no-store' });
  if (res.status === 404) throw new Error('Contrato no encontrado.');
  if (res.status === 403) throw new Error('No autorizado para ver este contrato.');
  if (!res.ok) throw new Error('Error al cargar el contrato.');
  return res.json();
}

function prettyStatus(s: ContractStatus) {
  if (s === 'issued') return 'Pendiente';
  if (s === 'accepted') return 'Aceptado';
  return 'Rechazado';
}

function fmtDateTime(iso?: string) {
  try {
    return new Date(iso!).toLocaleString();
  } catch {
    return iso || '';
  }
}
