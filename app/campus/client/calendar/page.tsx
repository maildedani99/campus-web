import PageHeader from "@/app/components/PageHeader"
import { Calendar } from "lucide-react"

export default function CalendarPage() {
  return (
    <div className="p-6">
        <PageHeader title="Calendario" />
      <Calendar />
    </div>
  )
}
