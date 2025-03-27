"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/Sidebar";
import { useAuth } from "@/lib/auth";
import { Bell, Calendar, CreditCard, Home, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

interface DashboardSidebarProviderProps {
  children: React.ReactNode;
}

export function DashboardSidebarProvider({
  children,
}: DashboardSidebarProviderProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  console.log("path", pathname);
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {user?.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.email || "user@example.com"}
              </span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                <Link href="/dashboard">
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/participants"}
              >
                <Link href="/participants">
                  <Users className="w-4 h-4" />
                  <span>Participants</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/transactions"}
              >
                <Link href="/transactions">
                  <CreditCard className="w-4 h-4" />
                  <span>Transactions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/announcements"}
              >
                <Link href="/announcements">
                  <Bell className="w-4 h-4" />
                  <span>Announcements</span>
                  <div className="ml-auto">3</div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/schedule"}>
                <Link href="/schedule">
                  <Calendar className="w-4 h-4" />
                  <span>Event Schedule</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/profile"}>
                <Link href="/profile">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex items-center h-16 gap-4 px-6 border-b bg-background/95 backdrop-blur">
          <SidebarTrigger />
          <div className="flex items-center justify-between flex-1">
            <h1 className="text-xl font-semibold">
              {pathname === "/dashboard" && "Dashboard"}
              {pathname === "/dashboard/participants" && "Participants"}
              {pathname === "/dashboard/transactions" && "Transactions"}
              {pathname === "/dashboard/announcements" && "Announcements"}
              {pathname === "/dashboard/schedule" && "Event Schedule"}
              {pathname === "/dashboard/profile" && "Profile"}
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  2
                </span>
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
