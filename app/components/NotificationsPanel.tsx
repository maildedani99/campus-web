"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useNotifications } from "../context/NotificationsContext"
import { CalendarDays, ClipboardList } from "lucide-react"

export default function NotificationsPanel() {
  const { open } = useNotifications()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-16 right-6 z-[1300]"
        >
          <div className="w-80 rounded-xl shadow-2xl bg-white text-zinc-900 p-3">
            <h3 className="text-lg font-bold mb-2">Notificaciones</h3>

            <ul className="space-y-2">
              <li className="flex items-center gap-3 rounded-md bg-zinc-100 px-3 py-2">
                <span className="shrink-0">
                  <CalendarDays className="w-4 h-4 text-zinc-700" />
                </span>
                <span className="text-sm">
                  📅 Cita con Romina – martes 5 agosto
                </span>
              </li>

              <li className="flex items-center gap-3 rounded-md bg-zinc-100 px-3 py-2">
                <span className="shrink-0">
                  <ClipboardList className="w-4 h-4 text-zinc-700" />
                </span>
                <span className="text-sm">
                  📝 Tarea de audio pendiente esta mañana
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
