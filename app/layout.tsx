// app/layout.tsx
import './globals.css'
import type { ReactNode } from 'react'
import { Nunito_Sans, Poppins, Roboto } from "next/font/google"
import AppThemeProvider from './theme/AppThemeProvider';

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700'] });
const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} `}>
      <body>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
