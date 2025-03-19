import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Search, Filter } from "lucide-react"

export const metadata: Metadata = {
  title: "Participants - Math Olympiad 2025",
  description: "Manage your Math Olympiad participants",
}

// Mock data for participants
const participants = [
  {
    id: "1",
    name: "John Smith",
    gender: "Male",
    dateOfBirth: "2005-05-15",
    email: "john.smith@example.com",
    phone: "+62 812 3456 7890",
    status: "Approved",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    gender: "Female",
    dateOfBirth: "2006-08-22",
    email: "sarah.j@example.com",
    phone: "+62 813 9876 5432",
    status: "Pending",
  },
  {
    id: "3",
    name: "Michael Wong",
    gender: "Male",
    dateOfBirth: "2005-11-10",
    email: "michael.w@example.com",
    phone: "+62 857 1234 5678",
    status: "Approved",
  },
]

export default function ParticipantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Participants</h1>
          <p className="text-gray-500">Manage your registered participants</p>
        </div>
        <Button asChild>
          <Link href="/participants/register">
            <UserPlus className="mr-2 h-4 w-4" />
            Register New
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Participants List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search participants..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead className="hidden md:table-cell">Date of Birth</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">{participant.name}</TableCell>
                    <TableCell>{participant.gender}</TableCell>
                    <TableCell className="hidden md:table-cell">{participant.dateOfBirth}</TableCell>
                    <TableCell className="hidden md:table-cell">{participant.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{participant.phone}</TableCell>
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
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/participants/${participant.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

