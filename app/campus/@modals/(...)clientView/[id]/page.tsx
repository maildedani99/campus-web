"use client"

import { CLIENTS, type Client } from "@/app/data/clients"
import { Box, Typography } from "@mui/material"
import ClientViewContent from "@/app/components/views/ClientViewContent"
import Modal from "@/app/components/modal"

export default function ClientViewModalPage({ params }: { params: { id: string } }) {
  // convierto params.id a número si tus CLIENTS usan number
  const client: Client | undefined = CLIENTS.find(
    (c) => String(c.id) === String(params.id) // comparación robusta
  )

  console.log("client recibido:", client)

  return (
    <Modal customWidth="75%">
      {client ? (
        <ClientViewContent client={client} />
      ) : (
        <Box sx={{ p: 3, minWidth: 360 }}>
          <Typography variant="h6" gutterBottom>
            Cliente no encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {params.id}
          </Typography>
        </Box>
      )}
    </Modal>
  )
}
