// /campus/inactive/payment/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/app/utils/fetcher';
import { useAuthSession } from '@/app/auth/useAuthSession';

export default function PaymentPage() {
  const { token } = useAuthSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const startCheckout = async () => {
    if (!token) return router.replace('/auth/login');
    setLoading(true);
    try {
      const res = await fetcher([
        'stripe/create-checkout',
        'POST',
        { purpose: 'deposit' }, // el backend coge el precio de BBDD
        token
      ]);
      window.location.href = res.url; // <-- navega a Stripe
    } catch (e) {
      alert('No se pudo iniciar el pago');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={startCheckout} disabled={loading}>
      {loading ? 'Redirigiendo…' : 'Pagar con tarjeta'}
    </button>
  );
}
