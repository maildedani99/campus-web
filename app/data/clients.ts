// app/data/clients.ts
export type ClientCourse = {
  id: string
  title: string
  startDate?: string
  endDate?: string
}

export type Client = {
  id: string
  name: string
  email: string
  lastAccess: string
  avatarUrl: string

  address?: string
  dni?: string
  phone?: string
  zip?: string

  coursePrice?: number
  totalPaid?: number
  courses?: ClientCourse[]
}

export const CLIENTS: Client[] = [
  {
    id: "1",
    name: "Elena Alonso",
    email: "elena@example.com",
    lastAccess: "Hace 3 horas",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    address: "C/ Gran Via 123, Barcelona",
    dni: "12345678A",
    phone: "+34 600 111 222",
    zip: "08010",
    coursePrice: 299,
    totalPaid: 150,
    courses: [
      { id: "rebirth-21", title: "Rebirth 21 días" },
      { id: "mindfulness-1", title: "Mindfulness Básico" },
    ],
  },
  {
    id: "2",
    name: "Daniel Vidal",
    email: "daniel@example.com",
    lastAccess: "Hace 5 minutos",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    address: "Av. Diagonal 77, Barcelona",
    dni: "98765432B",
    phone: "+34 600 333 444",
    zip: "08018",
    coursePrice: 299,
    totalPaid: 299,
    courses: [{ id: "rebirth-21", title: "Rebirth 21 días" }],
  },
  {
    id: "3",
    name: "María Arnaiz",
    email: "maria@example.com",
    lastAccess: "Hace 1 día",
    avatarUrl: "https://randomuser.me/api/portraits/women/21.jpg",
    address: "C/ Alcalá 45, Madrid",
    dni: "45612378C",
    phone: "+34 611 555 666",
    zip: "28010",
    coursePrice: 299,
    totalPaid: 100,
    courses: [{ id: "autoestima", title: "Autoestima Avanzada" }],
  },
  {
    id: "4",
    name: "Javier Gómez",
    email: "javier@example.com",
    lastAccess: "Hace 2 días",
    avatarUrl: "https://randomuser.me/api/portraits/men/54.jpg",
    address: "C/ Colón 12, Valencia",
    dni: "74185296D",
    phone: "+34 644 777 888",
    zip: "46001",
    coursePrice: 199,
    totalPaid: 199,
    courses: [{ id: "mindfulness-1", title: "Mindfulness Básico" }],
  },
  {
    id: "5",
    name: "Laura Fernández",
    email: "laura@example.com",
    lastAccess: "Hace 8 horas",
    avatarUrl: "https://randomuser.me/api/portraits/women/15.jpg",
    address: "Av. Roma 50, Barcelona",
    dni: "15975348E",
    phone: "+34 622 444 555",
    zip: "08029",
    coursePrice: 299,
    totalPaid: 50,
    courses: [{ id: "rebirth-21", title: "Rebirth 21 días" }],
  },
  {
    id: "6",
    name: "Carlos Ortega",
    email: "carlos@example.com",
    lastAccess: "Hace 30 minutos",
    avatarUrl: "https://randomuser.me/api/portraits/men/61.jpg",
    address: "C/ San Juan 88, Sevilla",
    dni: "85236974F",
    phone: "+34 655 111 999",
    zip: "41005",
    coursePrice: 399,
    totalPaid: 200,
    courses: [{ id: "coaching", title: "Coaching Personal" }],
  },
  {
    id: "7",
    name: "Patricia Ruiz",
    email: "patricia@example.com",
    lastAccess: "Hace 5 días",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    address: "C/ Libertad 2, Bilbao",
    dni: "75395128G",
    phone: "+34 600 987 654",
    zip: "48009",
    coursePrice: 249,
    totalPaid: 249,
    courses: [{ id: "rebirth-21", title: "Rebirth 21 días" }],
  },
  {
    id: "8",
    name: "Andrés Navarro",
    email: "andres@example.com",
    lastAccess: "Hace 12 horas",
    avatarUrl: "https://randomuser.me/api/portraits/men/73.jpg",
    address: "C/ Mayor 33, Zaragoza",
    dni: "95135782H",
    phone: "+34 622 333 222",
    zip: "50001",
    coursePrice: 299,
    totalPaid: 120,
    courses: [
      { id: "mindfulness-1", title: "Mindfulness Básico" },
      { id: "autoestima", title: "Autoestima Avanzada" },
    ],
  },
  {
    id: "9",
    name: "Cristina López",
    email: "cristina@example.com",
    lastAccess: "Hace 7 minutos",
    avatarUrl: "https://randomuser.me/api/portraits/women/36.jpg",
    address: "C/ San Pedro 101, Málaga",
    dni: "35795126I",
    phone: "+34 644 222 111",
    zip: "29002",
    coursePrice: 299,
    totalPaid: 299,
    courses: [{ id: "rebirth-21", title: "Rebirth 21 días" }],
  },
  {
    id: "10",
    name: "Miguel Torres",
    email: "miguel@example.com",
    lastAccess: "Hace 4 días",
    avatarUrl: "https://randomuser.me/api/portraits/men/25.jpg",
    address: "C/ Serrano 200, Madrid",
    dni: "14725836J",
    phone: "+34 633 999 000",
    zip: "28006",
    coursePrice: 199,
    totalPaid: 50,
    courses: [{ id: "coaching", title: "Coaching Personal" }],
  },
]
