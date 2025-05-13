import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardItem } from "./_components/DashboardItem";
import { getDashboardAction } from "./dasboard.action";
import { FastForward } from "lucide-react";
import { ROUTES } from "@/routes/router";

export default async function DashboardPage() {
  const [resDash] = await Promise.all([getDashboardAction()]);

  const quickAccess = [
    {
      title: "Data Peserta",
      description: "Lihat dan kelola seluruh peserta yang telah terdaftar",
      buttonTittle: "Lihat Semua",
      link: ROUTES.DASHBOARD.PARTICIPANTS,
    },
    {
      title: "Pendaftaran Peserta",
      description: "Daftarkan peserta untuk mengikuti OLMAT UINSA",
      buttonTittle: "Daftarkan Peserta",
      link: ROUTES.DASHBOARD.REGISTER_PARTICIPANTS,
    },
    {
      title: "Transaksi",
      description: "Lihat dan kelola seluruh riwayat transaksi",
      buttonTittle: "Lihat Semua",
      link: ROUTES.DASHBOARD.TRANSACTIONS,
    },
    {
      title: "Informasi Akun",
      description: "Kelola akun anda dan informasi akun",
      buttonTittle: "Kelola akun",
      link: ROUTES.DASHBOARD.ACCOUNT,
    },
  ];

  return (
    <div className="space-y-8">
      <DashboardItem resDash={resDash} />

      <h2 className="flex items-center gap-2 mt-10 text-2xl font-bold tracking-tight">
        <FastForward />
        Akses Cepat
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickAccess.map((item, i) => (
          <Card key={i} className="flex flex-col justify-between">
            <div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </div>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link href={item.link}>{item.buttonTittle}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
