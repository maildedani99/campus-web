"use client";

import Navbar from "../components/Navbar";
import NotificationsPanel from "../components/NotificationsPanel";
import RoleSwitcher from "../components/RoleSwitcher";
import { NotificationsProvider } from "../context/NotificationsContext";
import { Toolbar } from "@mui/material";



export default function CampusLayout({ children, modals }: { children: React.ReactNode ; modals?: React.ReactNode }) {
  return (
    <NotificationsProvider>
      {/* Navbar común, ya desplazada 240px */}
      <Navbar />

      {/* Empuja el contenido debajo del AppBar */}
      <Toolbar />
      <RoleSwitcher />

      {/* Los sub-layouts (client/teacher/admin) renderizan su Sidebar + main */}
      {children}
      {modals}

      <NotificationsPanel />
    </NotificationsProvider>
  );
}
