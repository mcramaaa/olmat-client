import type { Metadata } from "next";
import Link from "next/link";
// import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Download,
  Pencil,
  User,
  FileText,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Participant Details - Math Olympiad 2025",
  description: "View participant details",
};

// Mock data for a participant
const participant = {
  id: "1",
  name: "John Smith",
  gender: "Male",
  dateOfBirth: "2005-05-15",
  email: "john.smith@example.com",
  phone: "+62 812 3456 7890",
  status: "Approved",
  school: "SMA Negeri 1 Jakarta",
  province: "Jakarta",
  city: "Jakarta",
  subdistrict: "Menteng",
  documents: [
    { name: "ID Card", status: "Verified" },
    { name: "School ID", status: "Verified" },
    { name: "Birth Certificate", status: "Pending" },
  ],
  registrationDate: "2024-09-15",
  lastUpdated: "2024-09-20",
};

interface ParticipantPageProps {
  params: {
    id: string;
  };
}

export default async function ParticipantPage({
  params,
}: ParticipantPageProps) {
  // In a real app, you would fetch the participant data based on the ID
  // For demo purposes, we'll just check if the ID exists in our mock data
  // if (params.id !== "1" && params.id !== "2" && params.id !== "3") {
  //   notFound()
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/participants">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Participant Details
        </h1>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Profile</CardTitle>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/participants/${params.id}/edit`}>
                  <Pencil className="w-4 h-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center justify-center w-24 h-24 mb-4 bg-gray-200 rounded-full">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
                <h2 className="text-xl font-bold">{participant.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {participant.email}
                </p>
                <div
                  className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    participant.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : participant.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {participant.status}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Gender
                  </h3>
                  <p>{participant.gender}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Date of Birth
                  </h3>
                  <p>{participant.dateOfBirth}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Phone
                  </h3>
                  <p>{participant.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    School
                  </h3>
                  <p>{participant.school}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Location
                  </h3>
                  <p>
                    {participant.province}, {participant.city},{" "}
                    {participant.subdistrict}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="documents">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>
                    Documents submitted by the participant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {participant.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded on 2024-09-15
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              doc.status === "Verified"
                                ? "bg-green-100 text-green-800"
                                : doc.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {doc.status}
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Request Additional Documents
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                  <CardDescription>
                    Recent activity for this participant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Registration Approved</p>
                        <p className="text-sm text-muted-foreground">
                          2024-09-20 10:15 AM
                        </p>
                        <p className="mt-1 text-sm">
                          Participant registration was approved by admin
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-full">
                        <FileText className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Documents Verified</p>
                        <p className="text-sm text-muted-foreground">
                          2024-09-18 02:30 PM
                        </p>
                        <p className="mt-1 text-sm">
                          ID Card and School ID were verified
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full">
                        <User className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Profile Created</p>
                        <p className="text-sm text-muted-foreground">
                          2024-09-15 09:45 AM
                        </p>
                        <p className="mt-1 text-sm">
                          Participant profile was created
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
