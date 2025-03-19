import type { Metadata } from "next"
import { ParticipantRegistrationForm } from "@/components/participant-registration-form"

export const metadata: Metadata = {
  title: "Register Participants - Math Olympiad 2025",
  description: "Register participants for the International Mathematics Olympiad 2025",
}

export default function RegisterParticipantsPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Participant Registration</h1>
          <p className="text-gray-500">
            Register up to 11 participants for the International Mathematics Olympiad 2025
          </p>
        </div>

        <ParticipantRegistrationForm />
      </div>
    </div>
  )
}

