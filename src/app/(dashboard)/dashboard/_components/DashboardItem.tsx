"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IDashboard } from "@/interfaces/IDashboard";
import { ROUTES } from "@/routes/router";
import { CreditCard, LayoutDashboard, UserCheck, Users } from "lucide-react";
import { PiWhatsappLogo } from "react-icons/pi";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth";

interface IProps {
  resDash: any;
}

export function DashboardItem({ resDash }: IProps) {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (resDash?.error) {
      console.error("Error loading dashboard:", resDash.error);
      logout();
    }
  }, [resDash, logout]);

  const dashData: IDashboard = {
    eventSetting: {
      name: resDash?.data?.event_setting?.name || "",
      amount: resDash?.data?.event_setting?.amount || "",
      free: resDash?.data?.event_setting?.free || "",
      start: resDash?.data?.event_setting?.start || "",
      end: resDash?.data?.event_setting?.end || "",
    },
    successPayment: resDash?.data?.success_payment || "0",
    allPayment: resDash?.data?.all_payment || "0",
    successParticipant: resDash?.data?.success_participant || "0",
    pendingParticipant: resDash?.data?.pending_participant || "0",
  };

  return (
    <>
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <LayoutDashboard />
          Dashboard
        </h1>
        <p className="text-gray-500">
          Hi,{" "}
          <span className="font-medium text-slate-800">
            {user?.name || "User"}
          </span>{" "}
          Selamat datang di dashboard OLMAT UINSA.
        </p>
      </div>
      <div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Akun</CardTitle>
              <UserCheck className="w-6 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user?.name || "User"}</div>
              <p className="text-sm text-muted-foreground">
                {user?.type === "Admin"
                  ? user?.region?.name || ""
                  : user?.schoolName || ""}
              </p>
            </CardContent>
            <CardFooter>
              {user?.type !== "Admin" && (
                <Button asChild className="w-full" variant={"outline"}>
                  <Link href={ROUTES.DASHBOARD.ACCOUNT}>Kelola Akun</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                Peserta Terdaftar
              </CardTitle>
              <Users className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                <p>
                  {dashData.successParticipant}{" "}
                  <span className="text-xl">Peserta</span>
                </p>
              </div>
              <p className="text-sm font-bold text-black">
                {dashData.pendingParticipant}{" "}
                <span className="font-normal text-muted-foreground ">
                  peserta menunggu pembayaran
                </span>
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/participants/register">
                  {Number(dashData.successParticipant) !== 0
                    ? "Daftarkan Peserta Lagi"
                    : "Mulai daftarkan peserta"}
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                Status Transaksi
              </CardTitle>
              <CreditCard className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold">
                  {dashData.successPayment}/{dashData.allPayment}
                </div>
                <div className="px-2 py-1 text-sm text-green-800 bg-green-100 rounded-full">
                  Paid
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold">
                {dashData.successPayment}
                <p className="font-normal text-muted-foreground"> dari </p>
                {dashData.allPayment}
                <p className="font-normal text-muted-foreground">
                  transaksi telah terbayar
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href="/transactions">Lihat Transaksi</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      {Number(dashData.successParticipant) > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">
              Komunitas Whatsapp
            </CardTitle>
            <PiWhatsappLogo className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p>Gabung Komunitas Olimpiade Matematika UINSA</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <Link
                href="https://chat.whatsapp.com/IMEJiar6iZ0KEeijbMD0yJ"
                target="_blank"
              >
                Gabung Sekarang
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
