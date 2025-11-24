'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    // aquí decidimos si es depósito o pago final (en metadata)
    router.push('/campus'); // o al contrato si toca
  }, [sessionId, router]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Procesando pago…</h2>
      <p>Por favor espera un momento.</p>
    </div>
  );
}
