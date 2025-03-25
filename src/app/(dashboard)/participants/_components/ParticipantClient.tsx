import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMetaData } from "@/interfaces/IMetaData";
import { IParticipant } from "@/interfaces/IParticipant";
import { Eye, Filter, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { convertBirth, convertGender } from "@/helper/common";

interface IProps {
  participants: IParticipant[];
  metadata: IMetaData;
}

export default function ParticipantClient({ participants, metadata }: IProps) {
  return (
    <div>
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
                  <TableHead className="text-center">No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden text-center md:table-cell">
                    Gender
                  </TableHead>
                  <TableHead className="hidden text-center md:table-cell">
                    Date of Birth
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-center">
                      {i + 1}
                    </TableCell>
                    <TableCell>{participant.name}</TableCell>
                    <TableCell className="hidden text-center md:table-cell">
                      {convertGender(participant.gender)}
                    </TableCell>
                    <TableCell className="hidden text-center md:table-cell">
                      {convertBirth(participant.birth)}
                    </TableCell>
                    <TableCell className="">
                      <div className="flex justify-center">
                        <p
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            participant.status === "active"
                              ? "bg-green-100 text-green-800"
                              : participant.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {participant.status}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/participants/${participant.id}`}>
                            <Eye className="w-4 h-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        {/* <ParticipantCardButton
                          participant={participant}
                          disabled={participant.status !== "active"}
                        /> */}
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
