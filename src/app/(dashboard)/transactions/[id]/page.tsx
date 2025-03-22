import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DownloadReceiptButton } from "@/app/(dashboard)/transactions/_components/download-receipt-button";
import { PaymentQRCode } from "@/app/(dashboard)/transactions/_components/payment-qr-code";

export const metadata: Metadata = {
  title: "Transaction Details - Math Olympiad 2025",
  description: "View transaction details",
};

// Mock data for a transaction
const transaction = {
  id: "TX-001",
  date: "2024-09-20",
  time: "10:15 AM",
  amount: "Rp 750,000",
  participants: 3,
  paymentMethod: "Bank Transfer",
  status: "Completed",
  paymentDetails: {
    bank: "Bank Central Asia (BCA)",
    accountNumber: "1234567890",
    accountName: "John Doe",
    transferDate: "2024-09-20",
    referenceNumber: "BCA123456789",
  },
  participantsList: [
    {
      id: "1",
      name: "John Smith",
      gender: "male",
      birth: "27 September 2000",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      gender: "male",
      birth: "27 September 2000",
    },
    {
      id: "3",
      name: "Michael Wong",
      gender: "male",
      birth: "27 September 2000",
    },
  ],
  timeline: [
    {
      action: "Payment Completed",
      date: "2024-09-20",
      time: "10:15 AM",
      description: "Payment has been verified and completed",
    },
    {
      action: "Payment Verification",
      date: "2024-09-20",
      time: "10:10 AM",
      description: "Payment proof is being verified by admin",
    },
    {
      action: "Payment Submitted",
      date: "2024-09-20",
      time: "09:45 AM",
      description: "Payment proof was uploaded by user",
    },
    {
      action: "Transaction Created",
      date: "2024-09-19",
      time: "03:30 PM",
      description: "Transaction was created for 3 participants",
    },
  ],
};

interface TransactionPageProps {
  params: {
    id: string;
  };
}

export default function TransactionPage({ params }: TransactionPageProps) {
  console.log(params);
  // In a real app, you would fetch the transaction data based on the ID
  // For demo purposes, we'll just check if the ID exists in our mock data
  // if (params.id !== "TX-001" && params.id !== "TX-002" && params.id !== "TX-003") {
  //   notFound()
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/transactions">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Transaction Details
        </h1>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                Status Transaksi
              </CardTitle>
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  transaction.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : transaction.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {transaction.status}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-0">
              <h3 className="mb-4 font-semibold text-center">QRIS Payment</h3>

              <div className="w-full max-w-[200px] mx-auto mb-4">
                <PaymentQRCode qrCode={""} />
              </div>

              <div className="text-sm text-center text-muted-foreground">
                <p>Selesaikan pembayaran sebelum</p>
                <p className="text-black">Rabu, 12 Maret 2025 Pukul 13.45</p>
              </div>
            </CardContent>
            <CardContent className="pb-0">
              <div className="flex items-center justify-between w-full mt-4 border-t">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Invoice
                </h3>
                <p className="font-medium">{transaction.id}</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Tanggal
                </h3>
                <p className="text-sm font-medium">
                  {transaction.date} {transaction.time}
                </p>
              </div>
            </CardContent>
            <CardContent className="">
              <div className="pt-4 space-y-2 border-t">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Harga
                  </h3>
                  <p>Rp. 60.000</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Jumlah Peserta
                  </h3>
                  <p>{transaction.participantsList.length} participants</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Biaya Admin
                  </h3>
                  <p>Rp. 400.000</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 mt-4 text-xl border-t">
                <h3 className="text-sm font-medium ">Payment Amount</h3>
                <p className="font-bold">{transaction.amount}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <DownloadReceiptButton paymentId={transaction.id} />
              {/* <Button variant="outline" size="sm">
                <Receipt className="w-4 h-4 mr-2" />
                Download Receipt
              </Button> */}
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Registered Participants</CardTitle>
              <CardDescription>
                Participants included in this transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-3/5">Name</TableHead>
                      <TableHead className="w-1/5 text-center">
                        Gender
                      </TableHead>
                      <TableHead className="w-1/5 text-center">
                        Birtday
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transaction.participantsList.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">
                          {participant.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {participant.gender}
                        </TableCell>

                        <TableCell className="text-center">
                          {participant.birth}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
