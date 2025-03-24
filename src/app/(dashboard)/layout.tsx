import type React from "react";
import { DashboardSidebar } from "./dashboard/_components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <DashboardSidebar />
      <div className="flex-1">
        <div className="container md:p-7 lg:px-1 pb-8">{children}</div>
      </div>
    </div>
  );
}
