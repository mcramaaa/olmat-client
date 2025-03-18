import type React from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <DashboardSidebar />
      <div className="flex-1">
        <div className="container p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
