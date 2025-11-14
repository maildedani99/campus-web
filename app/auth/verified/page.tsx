import { Suspense } from "react";
import VerifiedClient from "./VerifiedClient";

export default function VerifiedPage() {
  return (
    <Suspense fallback={<div>Verificando tu correo...</div>}>
      <VerifiedClient />
    </Suspense>
  );
}
