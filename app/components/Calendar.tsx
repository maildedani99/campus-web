"use client"

import { useState } from "react"
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Views,
} from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { es } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"

// Locales
const locales = { es }

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

// Eventos
const events = [
  {
    title: "Cita con Romina",
    start: new Date(2025, 6, 20, 10, 0),
    end: new Date(2025, 6, 20, 11, 0),
  },
  {
    title: "Meditación guiada",
    start: new Date(2025, 6, 21, 8, 30),
    end: new Date(2025, 6, 21, 9, 0),
  },
]

const viewLabels: Record<keyof typeof Views, string> = {
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
}

export default function CalendarComponent() {
  const [view, setView] = useState<keyof typeof Views>("month")

  return (
    <div className="rounded-xl shadow-md bg-white p-4">
      {/* Encabezado y botones */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Mi Calendario</h2>

        <div className="flex gap-2">
          {Object.entries(viewLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setView(key as keyof typeof Views)}
              className={`px-3 py-1.5 text-sm rounded-md border transition ${
                view === key
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendario */}
      <div className="rounded-lg overflow-hidden bg-white">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={setView}
          views={["month", "week", "day", "agenda"]}
          toolbar={false}
          style={{ height: 480 }}
          popup
          culture="es"
        />
      </div>
    </div>
  )
}
