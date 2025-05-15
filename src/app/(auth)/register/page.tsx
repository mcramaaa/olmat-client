import type { Metadata } from "next";
import Link from "next/link";
import { getDegreeAction, getProvinceAction } from "./register.action";
import ClientPageRegis from "./_components/ClientPageRegis";

export const metadata: Metadata = {
  title: "Register - Olmat UINSA 2025",
  description:
    "Numbers beyond time Reviving the greatness of abbasiyah mathematics in the modern world",
};

interface IProps {
  searchParams: Promise<{ sec: string }>;
}

export default async function RegisterPage({ searchParams }: IProps) {
  const resProvince = await getProvinceAction();
  const resDegree = await getDegreeAction();
  const { sec } = await searchParams;
  return (
    <div className="container px-4 py-12 md:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Pendaftaran</h1>
          <p className="text-gray-500">
            Silakan pilih jenis pendaftaran yang ingin kamu lakukan.
          </p>
        </div>

        <ClientPageRegis
          param={sec}
          resDegree={resDegree}
          resProvince={resProvince}
        />

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Kamu sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Masuk
            </Link>{" "}
            untuk mengelola data peserta.
          </p>
        </div>
      </div>
    </div>
  );
}
