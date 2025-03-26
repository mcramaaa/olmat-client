"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

// Sample participant data
const participant = {
  id: "P001",
  name: "John Smith",
  gender: "Male",
  dateOfBirth: "2005-05-15",
  school: "SMA Negeri 1 Jakarta",
  rayon: "Jakarta Pusat",
  photo:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/idcard-IOgxy0oifXAO3TwYyhoyGQvIUF4DGc.png",
  status: "Approved",
  paymentStatus: "Paid",
};

export default function CardPreviewClientPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/participants/all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Participant Card Preview
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[148mm] h-[210mm] max-w-full max-h-[70vh] bg-[#0f172a] text-white rounded-lg overflow-hidden shadow-lg flex flex-col items-center p-6 relative">
              {/* Header */}
              <div className="mb-4 text-center">
                <h2 className="text-xl font-bold">INTERNATIONAL MATHEMATICS</h2>
                <h2 className="text-xl font-bold">OLYMPIAD 2025</h2>
              </div>

              {/* Photo */}
              <div className="w-32 h-40 mb-6 overflow-hidden bg-white rounded-md">
                {participant.photo ? (
                  <Image
                    src={participant.photo || "/placeholder.svg"}
                    alt={participant.name}
                    width={128}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    No Photo
                  </div>
                )}
              </div>

              {/* Participant Details */}
              <div className="w-full space-y-4 text-center">
                <div>
                  <h3 className="text-sm font-semibold uppercase">
                    PARTICIPANT ID
                  </h3>
                  <p className="text-lg font-bold">{participant.id}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase">NAME</h3>
                  <p className="text-lg font-bold">{participant.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase">SCHOOL</h3>
                  <p className="text-base">{participant.school}</p>
                </div>

                <div className="text-xs">
                  <p>Gender: {participant.gender}</p>
                  <p>Date of Birth: {participant.dateOfBirth}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="absolute text-xs text-center bottom-4">
                <p>This card must be presented during the competition</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Download Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="mb-2 font-semibold">Participant Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">ID:</span> {participant.id}
                </div>
                <div>
                  <span className="text-gray-500">Name:</span>{" "}
                  {participant.name}
                </div>
                <div>
                  <span className="text-gray-500">Gender:</span>{" "}
                  {participant.gender}
                </div>
                <div>
                  <span className="text-gray-500">Date of Birth:</span>{" "}
                  {participant.dateOfBirth}
                </div>
                <div>
                  <span className="text-gray-500">School:</span>{" "}
                  {participant.school}
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>{" "}
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                    {participant.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              {/* <Button className="w-full" onClick={() => {}}>
                <ParticipantCardButton participant={participant} />
                Download Participant Card (A5 PDF)
              </Button> */}
            </div>

            <div className="p-4 text-sm text-gray-500 rounded-md bg-gray-50">
              <p>
                <strong>Note:</strong> The participant card can only be
                {/* downloaded for participants with an "Approved" status and "Paid" */}
                payment status. The PDF will be generated in A5 size (148 × 210
                mm).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
