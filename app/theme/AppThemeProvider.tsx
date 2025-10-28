"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito Sans, sans-serif",
  },
  palette: {
    mode: "light",          // 👈 forzamos modo claro
    primary: { main: "#D60001" },
    // NO sobrescribimos text.* ni background.* para no “romper” el contraste
  },
});

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
