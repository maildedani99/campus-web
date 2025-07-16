import Image from "next/image"

type Participant = {
  id: string
  name: string
  email: string
  role: "Gerrer@" | "Equipo"
  lastAccess: string
  avatarUrl: string
}

const participants: Participant[] = [
  {
    id: "1",
    name: "Elena Alonso",
    email: "elena@example.com",
    role: "Gerrer@",
    lastAccess: "Hace 3 horas",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "2",
    name: "Daniel Vidal",
    email: "daniel@example.com",
    role: "Gerrer@",
    lastAccess: "Hace 5 minutos",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    name: "Maria Arnaiz",
    email: "maria@example.com",
    role: "Equipo",
    lastAccess: "Hace 1 día",
    avatarUrl: "https://randomuser.me/api/portraits/women/21.jpg",
  },
]

export default function ParticipantsTable() {
  return (
      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 font-medium">
            <tr>
              <th className="px-3 py-2">Nombre / Email</th>
              <th className="px-3 py-2">Rol</th>
              <th className="px-3 py-2">Último acceso</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-800">
            {participants.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="flex items-center gap-2 px-3 py-2">
                  <Image
                    src={p.avatarUrl}
                    alt={p.name}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <div className="leading-tight">
                    <div className="font-medium text-sm">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.email}</div>
                  </div>
                </td>
                <td className="px-3 py-2 text-sm">{p.role}</td>
                <td className="px-3 py-2 text-sm">{p.lastAccess}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}
