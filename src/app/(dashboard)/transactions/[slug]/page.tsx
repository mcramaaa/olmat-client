import type { Metadata } from "next";
import { getInvAction } from "../transaction.action";
import BackButton from "@/components/ui/BackButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { PaymentQRCode } from "../_components/payment-qr-code";
import {
  convertDateServer,
  convertDateTimeServer,
  convertGender,
  convertRupiah,
} from "@/helper/common";
import { DownloadReceiptButton } from "../_components/download-receipt-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Transaction Details - Math Olympiad 2025",
  description: "View transaction details",
};

interface TransactionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TransactionPage({
  params,
}: TransactionPageProps) {
  const { slug } = await params;

  const res = await getInvAction(slug);
  const transaction = res.data;
  const participants = res.participants || [];

  // const statusNow =
  //   transaction?.status === "pending" &&
  //   new Date() > new Date(transaction?.expiredAt)
  //     ? "expired"
  //     : transaction?.status;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight">Detail Transaksi</h1>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="duration-300 md:w-2/5 lg:w-1/3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">
                Status Transaksi
              </CardTitle>
              <div
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  transaction?.status === "paid"
                    ? "bg-green-100 text-green-800"
                    : transaction?.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {transaction?.status}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-0">
              {transaction?.status === "paid" ? (
                <div className="flex justify-center w-full mx-auto mb-4">
                  <div className="p-4 text-center space-y-4">
                    <BadgeCheck className="w-20 h-20 mx-auto text-green-500" />
                    <h3 className="font-semibold text-center">
                      Pembayaran Berhasil 🎉
                    </h3>

                    <p className="">
                      Terimakasih, pembayaran peserta Olimpiade Matematika UINSA
                      sudah kami terima.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="mb-4 font-semibold text-center">
                    QRIS Payment
                  </h3>
                  <div className="flex justify-center w-full mx-auto mb-4">
                    <PaymentQRCode
                      qrCode={transaction?.action?.qrString || ""}
                    />
                  </div>

                  <div className="text-center text-md text-muted-foreground">
                    <p>Ayo segera selesaikan pembayaran kamu</p>
                  </div>
                </>
              )}
            </CardContent>
            <CardContent className="pb-0 my-4">
              <div className="py-2 border-y">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Invoice
                  </h3>
                  <p className="font-medium">{transaction?.invoice}</p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Tanggal
                  </h3>
                  <p className="text-sm font-medium">
                    {transaction?.createdAt &&
                      convertDateTimeServer(transaction?.createdAt)}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardContent className="">
              <div className="space-y-2 ">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Harga
                  </h3>
                  <p>{convertRupiah(transaction?.amount)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Jumlah Peserta
                  </h3>
                  <p>{transaction?.participantAmount} Peserta</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Biaya Admin
                  </h3>
                  <p>{convertRupiah(transaction?.fee)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 mt-4 text-lg border-t">
                <h3 className="text-sm font-medium ">Total Pembayaran</h3>
                <p className="font-bold">
                  {convertRupiah(transaction?.totalAmount)}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {transaction?.invoice && (
                <DownloadReceiptButton
                  transction={transaction}
                  participants={participants}
                  disabled={transaction.status !== "paid"}
                  paymentId={transaction?.invoice}
                />
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="duration-300 md:w-3/5 lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Peserta</CardTitle>
              <CardDescription>
                Data peserta yang terdapat pada transaksi ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">No.</TableHead>
                      <TableHead className="w-3/5">Nama</TableHead>
                      <TableHead className="w-1/5 text-center">
                        Kelamin
                      </TableHead>
                      <TableHead className="w-1/5 text-center">
                        Tanggal Lahir
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="text-center">{i + 1}</TableCell>
                        <TableCell className="font-medium">
                          {participant.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {convertGender(participant.gender)}
                        </TableCell>

                        <TableCell className="text-center">
                          {convertDateServer(
                            new Date(participant.birth).toISOString()
                          )}
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

// : transaction?.status === "pending" &&
//   new Date() > new Date(transaction?.expiredAt) ? (
//   <div className="flex justify-center w-full mx-auto mb-4 ">
//     <div className="p-4 text-center space-y-6">
//       <Frown className="w-16 h-16 mx-auto text-red-500" />
//       <h3 className="mb-4 font-semibold text-center text-red-600">
//         Oops, batas waktu pembayaran sudah lewat.
//       </h3>
//       <p className="mb-2">
//         Tenang, kamu masih bisa meminta QR baru kok.
//       </p>
//       <RegenerateQrButton id={transaction.id} />
//     </div>
//   </div>
// )
