'use client';

import * as React from 'react';
import { FileText } from 'lucide-react';
import StepCard from './StepCard';

export default function ContractStepCard({
  done,
  disabled,
  onClick,
}: {
  done: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <StepCard
      icon={<FileText size={24} />}
      title="Firma de contrato"
      description={done ? 'Contrato firmado.' : 'Firma el contrato para activar tu cuenta.'}
      done={done}
      onClick={onClick}
      disabled={disabled}
      actionText="Firmar"
    />
  );
}
