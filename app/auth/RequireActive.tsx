'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthSession } from './useAuthSession';

type Props = {
  /** Ruta de la página de inactivos. Cambia si la tienes en /campus/inactive */
  inactivePath?: string; // default: '/inactive'
};

export default function RequireActive({
  children,
  inactivePath = '/campus/inactive',
}: React.PropsWithChildren<Props>) {
  const { user, ready } = useAuthSession();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!ready) return;

    // Sin sesión → login
    if (!user) {
      router.replace('/auth/login');
      return;
    }

    // Usuario inactivo → redirige a inactive, evitando bucle si ya estás allí
    if (user.isActive === false && pathname !== inactivePath) {
      router.replace(inactivePath);
      return;
    }
  }, [ready, user, router, pathname, inactivePath]);

  // Mientras decide o si no cumple condiciones, no renderizamos children
  if (!ready) return null;
  if (!user) return null;
  if (user.isActive === false && pathname !== inactivePath) return null;

  return <>{children}</>;
}
