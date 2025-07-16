"use client"

import { useNotifications } from "@/app/context/NotificationsContext"
import { Bell } from "lucide-react"

export default function NotificationBell() {
  const { toggle } = useNotifications()

  return (
    <button onClick={toggle} className="relative p-2 hover:bg-neutral-800 rounded-full">
      <Bell className="text-white" size={20} />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
    </button>
  )
}
