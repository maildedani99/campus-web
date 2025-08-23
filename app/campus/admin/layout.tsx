"use client";

import SidebarAdmin from "@/app/components/sidebars/SidebarAdmin";
import { drawerWidth } from "@/app/constants/layout";
import { Box } from "@mui/material";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarAdmin />
      <Box component="main" sx={{ ml: `${drawerWidth}px`, p: 2 }}>
        {children}
      </Box>
    </>
  );
}
