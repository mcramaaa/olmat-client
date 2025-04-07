import type React from "react";
import { DashboardSidebar } from "./dashboard/_components/dashboard-sidebar";
import DashboardHeader from "./dashboard/_components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <DashboardSidebar />
      <div className="flex-1 w-full relative">
        <DashboardHeader />
        <div className="container pb-8 pt-6 md:px-7">{children}</div>
      </div>
    </div>
  );
}
