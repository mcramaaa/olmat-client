import type React from "react";

import "@/app/globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { AuthProvider } from "@/lib/auth";

export const metadata = {
  title: "OLMAT UINSA – Olimpiade Matematika Nasional UIN Sunan Ampel Surabaya",
  description:
    "Ikuti OLMAT UINSA 2025 – Olimpiade Matematika Nasional dari UIN Sunan Ampel Surabaya. Daftar online, cek jadwal, dan raih prestasi terbaikmu!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-white">
        <AuthProvider>
          <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
