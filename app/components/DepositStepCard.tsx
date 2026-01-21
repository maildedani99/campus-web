'use client';

import * as React from 'react';
import { CreditCard } from 'lucide-react';
import StepCard from './StepCard';

export default function DepositStepCard({
  done,
  loading,
  onClick,
}: {
  done: boolean;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <StepCard
      icon={<CreditCard size={24} />}
      title="Pago de reserva"
      description={done ? 'Pago confirmado.' : 'Realiza el pago de reserva para continuar.'}
      done={done}
      onClick={onClick}
      loading={loading}
      disabled={loading}
      actionText="Pagar"
    />
  );
}
