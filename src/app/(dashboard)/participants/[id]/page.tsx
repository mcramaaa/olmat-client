import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getParticipantIdAction } from "../participant.action";
import ParticipantDetailClient from "../_components/ParticipantDetailClient";

export const metadata: Metadata = {
  title: "Participant Details - Math Olympiad 2025",
  description: "View participant details",
};

interface ParticipantPageProps {
  params: {
    id: string;
  };
}

export default async function ParticipantPage({
  params,
}: ParticipantPageProps) {
  const { id } = await params;
  const res = await getParticipantIdAction(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/participants">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Detail Peserta</h1>
      </div>

      <ParticipantDetailClient participant={res.data} />
    </div>
  );
}
