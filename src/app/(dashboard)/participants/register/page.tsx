import type { Metadata } from "next";
import ParticipantFormV3 from "../_components/ParticipantFormV3";

export const metadata: Metadata = {
  title: "Register Participants - Math Olympiad 2025",
  description:
    "Register participants for the International Mathematics Olympiad 2025",
};

export default function RegisterParticipantsPage() {
  return (
    <div className="container px-4 md:px-6 pb-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Participant Registration</h1>
          <p className="text-gray-500">
            Register up to 11 participants for the International Mathematics
            Olympiad 2025
          </p>
        </div>

        <ParticipantFormV3 />
      </div>
    </div>
  );
}
