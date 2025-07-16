import PageHeader from "@/app/components/PageHeader"
import dynamic from "next/dynamic"

const Calendar = dynamic(() => import("../../components/Calendar"), {
  ssr: false, // IMPORTANTE: Evita que se cargue del lado del servidor
})

export default function CalendarPage() {
  return (
    <div className="p-6">
        <PageHeader title="Calendario" />
      <Calendar />
    </div>
  )
}
