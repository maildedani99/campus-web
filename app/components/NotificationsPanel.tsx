"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useNotifications } from "../context/NotificationsContext"

export default function NotificationsPanel() {
  const { open } = useNotifications()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed top-16 right-6 z-50 w-80 bg-white text-black shadow-lg rounded-md p-4"
        >
          <h2 className="text-lg font-bold mb-3">Notificaciones</h2>
          <div className="space-y-2 text-sm">
            <div className="bg-gray-100 p-2 rounded">📅 Cita con Romina – martes 5 agosto</div>
            <div className="bg-gray-100 p-2 rounded">📝 Tarea de audio pendiente esta mañana</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
