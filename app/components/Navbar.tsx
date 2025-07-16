"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { useNotifications } from "../context/NotificationsContext"

export default function Navbar() {
  const { toggle } = useNotifications()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-bg text-white px-6 py-3 shadow-md relative z-50 flex items-center justify-between">
      {/* CENTRO: Menú principal centrado */}
      <ul className="flex gap-6 text-sm font-medium mx-auto">
        <li className="hover:text-red-500 cursor-pointer">Inicio</li>
        <li className="hover:text-red-500 cursor-pointer">Mis cursos</li>
        <li className="hover:text-red-500 cursor-pointer">Calendario</li>
        <li className="hover:text-red-500 cursor-pointer">Participantes</li>
        <li className="hover:text-red-500 cursor-pointer">Mensajes</li>
      </ul>

      {/* DERECHA: Perfil + Notificaciones */}
      <div className="flex items-center gap-4">
        {/* Perfil */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-full hover:bg-neutral-700"
          >
            <User size={18} />
            <span className="text-sm">Perfil</span>
            <ChevronDown size={16} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-md text-sm shadow-md">
              <button className="w-full px-4 py-2 hover:bg-neutral-700 flex gap-2 items-center">
                <Settings size={16} /> Configuración
              </button>
              <button className="w-full px-4 py-2 hover:bg-neutral-700 flex gap-2 items-center">
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>

        {/* Campanita de notificaciones */}
        <button
          onClick={toggle}
          className="relative hover:text-red-500 transition"
        >
          <Bell size={25} />
          <span className="absolute -top-1.5 -right-1 bg-red-600 text-[9px] h-4 w-4 rounded-full text-white flex items-center justify-center leading-none font-medium shadow-md">
            2
          </span>
        </button>
      </div>
    </nav>
  )
}
