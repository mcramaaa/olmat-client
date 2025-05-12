"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/Pagination";
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
import { convertRupiah } from "@/helper/common";
import { useEncodedUrl } from "@/hooks/useEncodeUrl";
import { IMetaData } from "@/interfaces/IMetaData";
import { IPayment } from "@/interfaces/IPayments";
// import { Filter, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface IProps {
  transactions: IPayment[];
  metadata: IMetaData;
  params: {
    page: number;
    limit: number;
  };
}

export default function TransactionClient({
  transactions,
  metadata,
  params,
}: IProps) {
  const path = usePathname();
  const router = useRouter();
  const encodedCurrentUrl = useEncodedUrl();

  // function changeStatus(status: string, expiredAt: Date | string) {
  //   if (status === "pending" && new Date() > new Date(expiredAt)) {
  //     return "expired";
  //   }
  //   return status;
  // }

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
          <CardTitle>Riwayat Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className="flex flex-col gap-4 mb-6 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div> */}

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">No.</TableHead>
                  <TableHead>Invoice</TableHead>
                  {/* <TableHead className="text-center">
                    Batas Pembayaran
                  </TableHead> */}
                  <TableHead className="text-center">Jumlah Peserta</TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    Total Harga
                  </TableHead>

                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell>{transaction.invoice}</TableCell>
                    {/* <TableCell className="font-medium text-center">
                      {convertDateTime(transaction.expiredAt)}
                    </TableCell> */}
                    <TableCell className="hidden text-center md:table-cell">
                      {transaction.participantAmount} Peserta
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center">
                      {convertRupiah(transaction.totalAmount)}
                    </TableCell>
                    <TableCell className="flex justify-center items-center">
                      <div
                        className={`inline-flex items-center rounded-full mt-1 px-2.5 py-0.5 text-xs font-medium ${
                          transaction.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={`/transactions/${transaction.invoice}?returnUrl=${encodedCurrentUrl}`}
                        >
                          Lihat
                        </Link>
                      </Button>
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
