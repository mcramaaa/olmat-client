import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getParticipantAction } from "./participant.action";
import ParticipantClient from "./_components/ParticipantClient";

export const metadata: Metadata = {
  title: "All Participants - Math Olympiad 2025",
  description: "View all registered participants",
};

interface IProps {
  searchParams: Promise<{
    page: number;
    limit: number;
  }>;
}

export default async function AllParticipantsPage({ searchParams }: IProps) {
  const page = (await searchParams).page || 1;
  const limit = (await searchParams).limit || 10;

  const res = await getParticipantAction(page, limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Peserta 🎓</h1>
          <p className="text-sm text-gray-500">
            Cek data dirimu di bawah ini dan pastikan semuanya sudah lengkap.
            Jangan sampai ada yang ketinggalan 💪✨
          </p>
        </div>
        <Button asChild>
          <Link href="/participants/register">Daftarkan Peserta Baru</Link>
        </Button>
      </div>
      <ParticipantClient
        participants={res.data.data}
        metadata={res.data.metadata}
        params={{ page, limit }}
      />
    </div>
  );
}
