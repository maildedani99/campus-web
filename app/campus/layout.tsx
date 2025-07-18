import ChatWidget from "../components/ChatWidget";
import Navbar from "../components/Navbar";
import NotificationsPanel from "../components/NotificationsPanel";
import Sidebar from "../components/Sidebar";
import { NotificationsProvider } from "../context/NotificationsContext";

export default function CampusLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationsProvider>
      <div className="flex min-h-screen bg-bg text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="ml-56 mt-16 p-6">
            {children}
            <ChatWidget />
          </main>
        </div>
      </div>
      <NotificationsPanel />
    </NotificationsProvider>
  )
}
