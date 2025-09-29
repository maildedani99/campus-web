// app/campus/contracts/[id]/page.tsx
'use client';
import ContractView from '@/app/components/ContractViewer';
import { Box } from '@mui/material';

export default function ContractDetailPage({ params }: { params: { id: string } }) {
  return (
    <Box sx={{ p: 3 }}>
      <ContractView contractId={params.id} />
    </Box>
  );
}
