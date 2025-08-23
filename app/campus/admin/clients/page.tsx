// app/campus/admin/clients/page.tsx
"use client"

import ClientsTable from "@/app/components/tables/ParticipantsTable"


export default function ClientsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      <ClientsTable />
    </div>
  )
}
