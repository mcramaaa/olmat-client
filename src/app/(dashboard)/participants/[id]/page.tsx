import type { Metadata } from "next";
import { getParticipantIdAction } from "../participant.action";
import ParticipantDetailClient from "../_components/ParticipantDetailClient";
import BackButton from "@/components/ui/BackButton";

export const metadata: Metadata = {
  title: "Participant Details - Math Olympiad 2025",
  description: "View participant details",
};

interface ParticipantPageProps {
  params: {
    id: string;
  };
}

export default async function ParticipantPageDetail({
  params,
}: ParticipantPageProps) {
  const { id } = await params;
  const res = await getParticipantIdAction(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight">Detail Peserta</h1>
      </div>

      <div className="mb-4 md:hidden">
        <h1 className="text-2xl font-bold tracking-tight">
          Halo, pejuang Matematika! 🎓
        </h1>
        <p className="text-sm text-gray-500">
          Ini adalah halaman profilmu sebagai peserta Olimpiade Matematika
          UINSA.
        </p>
      </div>

      <ParticipantDetailClient participant={res.data} />
    </div>
  );
}
