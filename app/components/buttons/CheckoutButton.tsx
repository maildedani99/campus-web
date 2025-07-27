import { Button } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const CheckoutButton = ({ amount }: { amount: number }) => {
  const handleCheckout = async () => {
    const res = await fetch('http://localhost:3001/payment/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Error creando sesión de pago');
    }
  };

  return (
    <Button variant="contained" onClick={handleCheckout}>
      Pagar ${amount}
    </Button>
  );
};

export default CheckoutButton;
