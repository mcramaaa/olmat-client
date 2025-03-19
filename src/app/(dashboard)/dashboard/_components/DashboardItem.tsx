"use client";

import { ROUTES } from "@/routes/router";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { IDashboard } from "@/src/interfaces/IDashboard";
import { useAuth } from "@/src/lib/auth";
import { CreditCard, LayoutDashboard, UserCheck, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

// import api from "@/config/axiosConfig";
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
    pendingPayment: data.pending_payment,
    successParticipant: data.success_participant,
    pendingParticipant: data.pending_participant,
  };

  return (
    <>
      <div>
        <h1 className="text-3xl flex gap-2 items-center font-bold tracking-tight">
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
              <p className="text-xs font-bold text-black">
                {dashData.pendingParticipant}{" "}
                <span className="font-normal text-muted-foreground ">
                  peserta menunggu pembayaran
                </span>
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/participants/register">
                  Daftarkan Peserta Lagi
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
                  {dashData.successPayment}/{dashData.pendingPayment}
                </div>
                <div className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                  Paid
                </div>
              </div>
              <div className="flex text-xs items-center gap-1 font-bold">
                {dashData.successPayment}
                <p className="font-normal text-muted-foreground"> dari </p>
                {dashData.pendingPayment}
                <p className="font-normal text-muted-foreground">
                  transaksi telah terbayar
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href="/payment/PAY-001">Lihat Transaksi</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
