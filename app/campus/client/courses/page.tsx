import Courses from "@/app/components/Courses";
import PageHeader from "@/app/components/PageHeader";

export default function CoursesPage() {
  return (
    <main className="p-6">
                <PageHeader  title="Mis Cursos" />
        
      <Courses />
    </main>
  )
}
