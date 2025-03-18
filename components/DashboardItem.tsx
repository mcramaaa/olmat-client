import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CreditCard, UserCheck, Users } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function DashboardItem() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">Akun</CardTitle>
            <UserCheck className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Nama</div>
            <p className="text-sm text-muted-foreground">SMA Nama Sekolah</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/participants/register">Register More</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">
              Registered Participants
            </CardTitle>
            <Users className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Out of 11 maximum participants
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/participants/register">Register More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">
              Payment Status
            </CardTitle>
            <CreditCard className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">3/5</div>
              <div className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                Paid
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Participants with completed payments
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <Link href="/payment/PAY-001">View Payment</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
