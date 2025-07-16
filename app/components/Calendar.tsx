"use client"

import { useState } from "react"
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Views,
} from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { format, parse, startOfWeek, getDay } from "date-fns"
import esES from "date-fns/locale/es"

// Configuración del localizador en español
const locales = {
  es: esES,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

// Eventos simulados
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

// Traducciones para los botones de vista
const viewLabels: Record<keyof typeof Views, string> = {
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
}

export default function CalendarComponent() {
  const [view, setView] = useState<keyof typeof Views>("month")

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border max-w-full text-sm">
      {/* Selector de vista personalizado */}
      <div className="flex justify-end gap-2 mb-3">
        {Object.entries(viewLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key as keyof typeof Views)}
            className={`px-3 py-1 rounded-md border text-sm transition ${
              view === key
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Calendario */}
      <div className="overflow-hidden rounded-md border bg-white text-black">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={setView}
          views={["month", "week", "day", "agenda"]}
          toolbar={false}
          style={{ height: "480px", fontSize: "12px" }}
          popup
        />
      </div>
    </div>
  )
}
