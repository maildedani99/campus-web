import PageHeader from "@/app/components/PageHeader";
import ParticipantsTable from "@/app/components/ParticipantsTable";

export default function ParticipantsPage() {
  return (
    <div className="p-6">
        <PageHeader title="Participantes" />
      <ParticipantsTable />
    </div>
  )
}
