// app/campus/contracts/[id]/page.tsx
'use client';
import ContractView from '@/app/components/ContractViewer';
import Modal from '@/app/components/Modal';
import { Box } from '@mui/material';

export default function ContractDetailPage({ params }: { params: { id: string } }) {
  return (
    <Modal >
      <Box>
      <ContractView contractId={params.id} />
      </Box>
    </Modal>
  );
}
