"use client"
import { useParams } from "next/navigation"
import VideoItem from "@/app/components/items/VideoItem"
import AudioItem from "@/app/components/items/AudioItem"
import TextItem from "@/app/components/items/TextItem"
import { mockSemanas } from "@/app/data/mockSemanas"

export default function ItemPage() {
  const { itemId } = useParams()

  const item = mockSemanas
    .flatMap((semana) => semana.items)
    .find((it) => it.id === itemId)

  if (!item) return <div style={{ padding: 32 }}>Item no encontrado</div>

  switch (item.type) {
    case "video":
      return <VideoItem />
    case "audio":
      return <AudioItem />
    case "text":
      return <TextItem />
    default:
      return <div>Tipo de item desconocido</div>
  }
}
