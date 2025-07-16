import PageHeader from "@/app/components/PageHeader";
import Whiteboard from "@/app/components/WhiteBoard";

export default function WhiteboardPage() {
  return (
       <div className="p-6">
        <PageHeader  title="Pizarra diaria" />
      <Whiteboard />
    </div>
  )
}
