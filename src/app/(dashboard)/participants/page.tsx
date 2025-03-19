import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Search, Filter, Eye } from "lucide-react";
import { ParticipantCardButton } from "./_components/participant-card-button";

export const metadata: Metadata = {
  title: "All Participants - Math Olympiad 2025",
  description: "View all registered participants",
};

// Mock data for participants
const participants = [
  {
    id: "P001",
    name: "John Smith",
    gender: "Male",
    dateOfBirth: "2005-05-15",
    school: "SMA Negeri 1 Jakarta",
    rayon: "Jakarta Pusat",
    photo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/idcard-IOgxy0oifXAO3TwYyhoyGQvIUF4DGc.png", // Using the ID card template as a placeholder
    status: "Approved",
    paymentStatus: "Paid",
  },
  {
    id: "P002",
    name: "Sarah Johnson",
    gender: "Female",
    dateOfBirth: "2006-08-22",
    school: "SMA Negeri 3 Surabaya",
    rayon: "Surabaya",
    photo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/idcard-IOgxy0oifXAO3TwYyhoyGQvIUF4DGc.png",
    status: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    id: "P003",
    name: "Michael Wong",
    gender: "Male",
    dateOfBirth: "2005-11-10",
    school: "SMA Santo Aloysius Bandung",
    rayon: "Bandung",
    photo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/idcard-IOgxy0oifXAO3TwYyhoyGQvIUF4DGc.png",
    status: "Approved",
    paymentStatus: "Paid",
  },
  {
    id: "P004",
    name: "Anisa Putri",
    gender: "Female",
    dateOfBirth: "2006-03-25",
    school: "SMA Negeri 5 Yogyakarta",
    rayon: "Yogyakarta",
    photo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/idcard-IOgxy0oifXAO3TwYyhoyGQvIUF4DGc.png",
    status: "Approved",
    paymentStatus: "Paid",
  },
  {
    id: "P005",
    name: "Budi Santoso",
    gender: "Male",
    dateOfBirth: "2005-07-12",
    school: "SMA Negeri 2 Semarang",
    rayon: "Semarang",
    photo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/idcard-IOgxy0oifXAO3TwYyhoyGQvIUF4DGc.png",
    status: "Rejected",
    paymentStatus: "Refunded",
  },
];

export default function AllParticipantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            All Participants
          </h1>
          <p className="text-gray-500">
            View and manage all registered participants
          </p>
        </div>
        <Button asChild>
          <Link href="/participants/register">Register New Participants</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Participants List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search participants..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all-status">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-payment">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-payment">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Gender</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Date of Birth
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">
                      {participant.id}
                    </TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {participant.gender}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {participant.dateOfBirth}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          participant.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : participant.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {participant.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          participant.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-800"
                            : participant.paymentStatus === "Unpaid"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {participant.paymentStatus}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/participants/${participant.id}`}>
                            <Eye className="w-4 h-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <ParticipantCardButton
                          participant={participant}
                          disabled={
                            participant.status !== "Approved" ||
                            participant.paymentStatus !== "Paid"
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>5</strong> of <strong>5</strong> participants
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
