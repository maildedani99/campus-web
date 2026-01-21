'use client';

import * as React from 'react';
import { ShieldCheck } from 'lucide-react';
import StepCard from './StepCard';

export default function LopdStepCard({
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
      icon={<ShieldCheck size={24} />}
      title="Aceptación de LOPD"
      description={done ? 'LOPD aceptada correctamente.' : 'Debe aceptar la política de protección de datos.'}
      done={done}
      onClick={onClick}
      disabled={disabled}
      actionText="Abrir"
    />
  );
}
