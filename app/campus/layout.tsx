// CampusLayout.tsx
import ChatWidget from "../components/ChatWidget"
import Navbar from "../components/Navbar"
import NotificationsPanel from "../components/NotificationsPanel"
import Sidebar from "../components/Sidebar"
import { NotificationsProvider } from "../context/NotificationsContext"
import { Box } from "@mui/material"

export default function CampusLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationsProvider>
      <div className="flex min-h-screen bg-bg text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="mt-16">
            <Box
              sx={{
                px: { xs: 2, md: 4 },
                py: 4,
                maxWidth: "1000px",
                margin: "0 auto",
              }}
            >
              {children}
              <ChatWidget />
            </Box>
          </main>
        </div>
      </div>
      <NotificationsPanel />
    </NotificationsProvider>
  )
}
