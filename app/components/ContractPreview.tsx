"use client";

import { useMemo, useState } from "react";
import Mustache from "mustache";

type UserData = {
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  coursePriceCents: number;
};

const DEFAULT_USER: UserData = {
  firstName: "Elena",
  lastName: "Alonso",
  dni: "12345678Z",
  email: "demo@rebirth.local",
  phone: "600000000",
  address: "C/ Mayor 1",
  postalCode: "28001",
  city: "Madrid",
  country: "España",
  coursePriceCents: 120000,
};

// Plantilla de contrato con placeholders Mustache
const TEMPLATE = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>{{user.fullName}} - Contrato</title>
<style>
  body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.4; padding: 24px; }
  h1 { font-size: 22px; margin-bottom: 12px; }
  h2 { font-size: 16px; margin-top: 18px; }
  ul { padding-left: 18px; }
  .meta { color: #666; font-size: 12px; margin-bottom: 16px; }
  .firma { margin-top: 38px; }
  hr { margin: 18px 0; }
</style>
</head>
<body>
  <div class="meta">Fecha: {{todayISO}}</div>
  <h1>Contrato de Matrícula</h1>
  <h2>Alumno</h2>
  <ul>
    <li>Nombre: {{user.fullName}}</li>
    <li>DNI: {{user.dni}}</li>
    <li>Email: {{user.email}}</li>
    <li>Teléfono: {{user.phone}}</li>
    <li>Dirección: {{user.address}}, {{user.postalCode}} {{user.city}}, {{user.country}}</li>
  </ul>
  <h2>Condiciones</h2>
  <p>Precio del curso: {{price.euros}} €</p>
  <p>El alumno acepta las condiciones del programa REBIRTH.</p>
  <hr/>
  <p class="firma">Firma del alumno: _______________________</p>
</body>
</html>`;

function buildCtx(user: UserData) {
  return {
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      address: user.address,
      phone: user.phone,
      dni: user.dni,
      postalCode: user.postalCode,
      city: user.city,
      country: user.country,
      coursePriceCents: user.coursePriceCents,
    },
    price: { euros: (user.coursePriceCents / 100).toFixed(2) },
    todayISO: new Date().toISOString().split("T")[0],
  };
}

export default function ContractPreview() {
  const [user, setUser] = useState<UserData>(DEFAULT_USER);
  const [template, setTemplate] = useState<string>(TEMPLATE);

  const html = useMemo(() => {
    try {
      return Mustache.render(template, buildCtx(user));
    } catch {
      return "<p>Error renderizando la plantilla</p>";
    }
  }, [template, user]);

  const downloadHtml = () => {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fileName = `contrato-${user.firstName}-${user.lastName}-${Date.now()}.html`;
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printPdf = () => {
    // Abre en nueva pestaña para imprimir a PDF
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };

  // helpers de cambio
  const onChange = (k: keyof UserData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = k === "coursePriceCents" ? Number(e.target.value || 0) : e.target.value;
    setUser((u) => ({ ...u, [k]: v as any }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* Panel de datos */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Datos del alumno</h2>
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded p-2" placeholder="Nombre" value={user.firstName} onChange={onChange("firstName")} />
          <input className="border rounded p-2" placeholder="Apellidos" value={user.lastName} onChange={onChange("lastName")} />
          <input className="border rounded p-2" placeholder="DNI" value={user.dni} onChange={onChange("dni")} />
          <input className="border rounded p-2" placeholder="Email" value={user.email} onChange={onChange("email")} />
          <input className="border rounded p-2" placeholder="Teléfono" value={user.phone} onChange={onChange("phone")} />
          <input className="border rounded p-2 col-span-2" placeholder="Dirección" value={user.address} onChange={onChange("address")} />
          <input className="border rounded p-2" placeholder="CP" value={user.postalCode} onChange={onChange("postalCode")} />
          <input className="border rounded p-2" placeholder="Ciudad" value={user.city} onChange={onChange("city")} />
          <input className="border rounded p-2" placeholder="País" value={user.country} onChange={onChange("country")} />
          <input className="border rounded p-2" type="number" placeholder="Precio (céntimos)" value={user.coursePriceCents} onChange={onChange("coursePriceCents")} />
        </div>

        <h2 className="text-xl font-semibold pt-4">Plantilla (Mustache)</h2>
        <textarea
          className="border rounded p-2 w-full h-56"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        />

        <div className="flex gap-2 pt-2">
          <button className="border rounded px-3 py-2" onClick={downloadHtml}>Descargar HTML</button>
          <button className="border rounded px-3 py-2" onClick={printPdf}>Imprimir / guardar PDF</button>
        </div>

        {/* (Opcional) Guardar en backend cuando lo tengas listo */}
        {/* <button className="border rounded px-3 py-2" onClick={saveToBackend}>Guardar en BD</button> */}
      </div>

      {/* Panel de preview */}
      <div className="border rounded h-[80vh] overflow-auto bg-white">
        {/* Mostramos el HTML como iframe para previsualización fiel */}
        <iframe title="preview" className="w-full h-full" srcDoc={html} />
      </div>
    </div>
  );
}
