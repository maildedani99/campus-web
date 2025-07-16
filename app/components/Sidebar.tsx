"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

// Datos simulados
const semanas = [
  {
    title: "Semana 1",
    status: "completada",
    items: [
      { label: "Video explicativo", done: true },
      { label: "Ejercicio", done: true },
      { label: "Meditación", done: true },
      { label: "Tarea", done: true },
    ],
  },
  {
    title: "Semana 2",
    status: "actual",
    items: [
      { label: "Video explicativo", done: true },
      { label: "Ejercicio", done: true },
      { label: "Meditación", done: true },
      { label: "Tarea", done: false },
    ],
  },
  {
    title: "Semana 3",
    status: "pendiente",
    items: [],
  },
  {
    title: "Semana 4",
    status: "bloqueada",
    items: [],
  },
]

export default function Sidebar() {
  const [open, setOpen] = useState<string[]>(["Semana 1", "Semana 2"])

  const toggleWeek = (title: string) => {
    setOpen((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    )
  }

  return (
<aside className="fixed top-0 left-0 z-40 bg-background text-white w-56 h-screen px-4 py-6 text-[13px] space-y-6">
      {/* Logo */}
      <div className="mb-2">
        <Image
          src="/logo.png"
          width={60}
          height={60}
          alt="Logo rebirth"
          className="mx-auto"
        />
      </div>

      {/* Título */}
      <div className="text-center">
        <h2 className="font-bold text-primary text-[14px]">21 Days – Julio 2025</h2>
      </div>

      {/* Semanas */}
      <div className="space-y-4">
        {semanas.map((semana) => {
          const isOpen = open.includes(semana.title)
          const allDone = semana.items.length > 0 && semana.items.every((item) => item.done)

          return (
            <div key={semana.title}>
              <button
                onClick={() => toggleWeek(semana.title)}
                className="flex items-center justify-between w-full text-left font-semibold"
              >
                <span className="flex items-center gap-1">
                  {semana.title}
                </span>
                {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {isOpen && semana.items.length > 0 && (
                <ul className="ml-2 mt-2 space-y-1 text-white/90 text-[13px]">
                  {semana.items.map((item, i) => (
                    <li key={i} className="relative pl-4">
                      {item.done && (
                        <span className="absolute left-0 top-[2px] text-green-500 text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>

      {/* Extra sections */}
      <div className="mt-8 space-y-1 text-white/80 text-[13px] border-t border-white/10 pt-4">
        <div className="hover:text-primary cursor-pointer">Encuestas</div>
        <div className="hover:text-primary cursor-pointer">Material adicional</div>
      </div>
    </aside>
  )
}
  