import type React from "react";

import "@/app/globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { AuthProvider } from "@/lib/auth";

export const metadata = {
  title: "OLMAT UINSA 2025",
  description:
    "Numbers beyond time Reviving the greatness of abbasiyah mathematics in the modern world",
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
