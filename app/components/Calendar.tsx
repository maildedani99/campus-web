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

import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
} from "@mui/material"

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
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      {/* Encabezado y botones */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Mi Calendario</Typography>

        <ButtonGroup size="small" variant="outlined">
          {Object.entries(viewLabels).map(([key, label]) => (
            <Button
              key={key}
              onClick={() => setView(key as keyof typeof Views)}
              variant={view === key ? "contained" : "outlined"}
              color={view === key ? "primary" : "inherit"}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Calendario */}
      <Box
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          "& .rbc-calendar": {
            fontSize: "13px",
            backgroundColor: "#fff",
          },
        }}
      >
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
      </Box>
    </Paper>
  )
}
