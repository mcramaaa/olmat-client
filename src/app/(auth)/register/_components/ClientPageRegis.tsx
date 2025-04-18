"use client";

import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import React from "react";
import { AccountRegistrationForm } from "./account-registration-form";
import { SchoolRegistrationForm } from "./school-registration-form";
import { useRouter } from "next/navigation";

interface IProps {
  resProvince: any;
  resDegree: any;
  param: string;
}

export default function ClientPageRegis({
  param,
  resDegree,
  resProvince,
}: IProps) {
  const router = useRouter();
  function changeParams(value: string) {
    router.push(`/register?sec=${value}`);
  }
  return (
    <div>
      <Tabs
        defaultValue={param ? `${param}` : "account"}
        onValueChange={changeParams}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Pendaftaran Akun</TabsTrigger>
          <TabsTrigger value="school">Pendaftaran Sekolah</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6">
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Daftar Akun Baru</h2>
            <p className="text-gray-500">
              Buat akun terlebih dahulu untuk mendaftarkan peserta Olimpiade
              Matematika. Dengan akun ini, kamu bisa kelola data peserta dengan
              mudah.
            </p>
          </div>
          <AccountRegistrationForm province={resProvince.data} />
        </TabsContent>

        <TabsContent value="school" className="mt-6">
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              Daftarkan Sekolah Kamu
            </h2>
            <p className="text-gray-500">
              Daftarkan sekolah kamu terlebih dahulu untuk mengikuti Olimpiade
              Matematika. Pastikan data sekolah diisi dengan lengkap dan benar.
            </p>
          </div>
          <SchoolRegistrationForm
            degrees={resDegree.data}
            provinces={resProvince.data}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
