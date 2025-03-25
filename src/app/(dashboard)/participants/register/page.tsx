import type { Metadata } from "next";
import ParticipantForm from "../_components/ParticipantForm";

export const metadata: Metadata = {
  title: "Register Participants - Math Olympiad 2025",
  description:
    "Register participants for the International Mathematics Olympiad 2025",
};

export default function RegisterParticipantsPage() {
  return (
    <div className="pb-12  md:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Pendaftaran OLMAT UINSA</h1>
          <p className="text-gray-500">
            Register up to 11 participants for the International Mathematics
            Olympiad 2025
          </p>
        </div>

        <ParticipantForm />
      </div>
    </div>
  );
}
