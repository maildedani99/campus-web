import Image from "next/image"
import { Progress } from "./ui/progress"

type CourseCardProps = {
  title: string
  subtitle: string
  image: string
  progress: number
}

export function CourseCard({ title, subtitle, image, progress }: CourseCardProps) {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden w-full max-w-xs text-sm">
      <div className="h-32 relative">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-xs">{subtitle}</p>
        <div className="pt-2">
          <Progress value={progress} />
          <p className="text-[11px] text-gray-500 mt-1">{progress}% completado</p>
        </div>
      </div>
    </div>
  )
}
