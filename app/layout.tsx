// app/layout.tsx
import './globals.css'
import type { ReactNode } from 'react'
import {  Poppins } from "next/font/google"
import AppThemeProvider from './theme/AppThemeProvider';

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} `}>
      <body>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
