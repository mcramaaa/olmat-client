"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IMetaData } from "@/interfaces/IMetaData";
import type { IParticipant } from "@/interfaces/IParticipant";
import { Eye } from "lucide-react";
import Link from "next/link";
import { convertBirth, convertGender } from "@/helper/common";
import { Pagination } from "@/components/ui/Pagination";
import { usePathname, useRouter } from "next/navigation";
import { useEncodedUrl } from "@/hooks/useEncodeUrl";

interface IProps {
  participants: IParticipant[];
  metadata: IMetaData;
  params: {
    page: number;
    limit: number;
  };
}

export default function ParticipantClient({
  participants,
  metadata,
  params,
}: IProps) {
  const path = usePathname();
  const router = useRouter();
  const encodedCurrentUrl = useEncodedUrl();

  const handlePageChange = (page: number) => {
    router.push(`${path}?page=${page}&limit=${params.limit}`);
  };

  const handleLimitChange = (limit: number) => {
    router.push(`${path}?page=${params.page}&limit=${limit}`);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>List Peserta</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className="flex flex-col gap-4 mb-6 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari peserta..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all-payment">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-payment">Semua</SelectItem>
                  <SelectItem value="paid">Terbayar</SelectItem>
                  <SelectItem value="unpaid">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div> */}

          <div className="overflow-hidden border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">No.</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead className="hidden text-center md:table-cell">
                    kelamin
                  </TableHead>
                  <TableHead className="hidden text-center md:table-cell">
                    Tanggal lahir
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
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
                          <Link
                            href={`/participants/${participant.id}?returnUrl=${encodedCurrentUrl}`}
                          >
                            <Eye className="w-4 h-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination
            currentPage={metadata.current_page}
            totalItems={metadata.total}
            itemsPerPage={metadata.per_page}
            onItemsPerPageChange={handleLimitChange}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
