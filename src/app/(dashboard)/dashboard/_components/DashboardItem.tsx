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
import { useAuth } from "@/lib/auth";
import { ROUTES } from "@/routes/router";
import { CreditCard, LayoutDashboard, UserCheck, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IProps {
  data: any;
}

export function DashboardItem({ data }: IProps) {
  const { user } = useAuth();
  const dashData: IDashboard = {
    eventSetting: {
      name: data.event_setting.name,
      amount: data.event_setting.amount,
      free: data.event_setting.free,
      start: data.event_setting.start,
      end: data.event_setting.end,
    },
    successPayment: data.success_payment,
    allPayment: data.all_payment,
    successParticipant: data.success_participant,
    pendingParticipant: data.pending_participant,
  };

  console.log(dashData.successParticipant === 0);

  return (
    <>
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <LayoutDashboard />
          Dashboard
        </h1>
        <p className="text-gray-500">
          Hi, <span className="font-medium text-slate-800">{user?.name}</span>{" "}
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
              <div className="text-3xl font-bold">{user?.name}</div>
              <p className="text-sm text-muted-foreground">
                {user?.schoolName}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={"outline"}>
                <Link href={ROUTES.DASHBOARD.ACCOUNT}>Kelola Akun</Link>
              </Button>
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
                  {+dashData.successParticipant !== 0
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
    </>
  );
}
