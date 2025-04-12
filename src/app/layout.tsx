import type React from "react";

import "@/app/globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { AuthProvider } from "@/lib/auth";

export const metadata = {
  title: "Math Olympiad 2025",
  description: "International Mathematics Olympiad 2025 Registration",
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
