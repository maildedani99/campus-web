import { CourseCard } from "./CourseCard"

const mockCourses = [
  {
    title: "21 Days - Julio 2025",
    subtitle: "REBiRTH - El Método",
    image: "/logo.png",
    progress: 50,
  },
  {
    title: "Sesión grupal",
    subtitle: "Mentoría mensual",
    image: "/logo.png",
    progress: 80,
  },
]

export default function Courses() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {mockCourses.map((course, idx) => (
        <CourseCard key={idx} {...course} />
      ))}
    </div>
  )
}
