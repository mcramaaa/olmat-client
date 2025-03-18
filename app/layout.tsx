import type React from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthProvider } from "@/lib/auth";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
        <ThemeProvider defaultTheme="light">
          <AuthProvider>
            <div className="relative flex flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
