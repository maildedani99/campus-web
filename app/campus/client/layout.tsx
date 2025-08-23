"use client";

import SidebarClient from "@/app/components/sidebars/SidebarClient";
import { drawerWidth } from "@/app/constants/layout";
import { Box } from "@mui/material";

export default function ClientLayout({ children, modals }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarClient />
      <Box component="main" sx={{ ml: `${drawerWidth}px`, p: 2 }}>
        {children}
                  {modals ?? null}

      </Box>
    </>
  );
}
