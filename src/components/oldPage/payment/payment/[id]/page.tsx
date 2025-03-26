import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Clock, QrCode, AlertCircle } from "lucide-react";
import { PaymentCountdown } from "@/components/payment-countdown";

export const metadata: Metadata = {
  title: "Payment Details - Math Olympiad 2025",
  description: "Complete your payment for the Math Olympiad",
};

// Mock data for a payment
const payment = {
  id: "PAY-001",
  createdAt: "2024-09-20 14:30:00",
  expiresAt: "2024-09-21 14:30:00",
  status: "pending", // pending, completed, expired
  method: "qris",
  details: {
    totalParticipants: 3,
    pricePerParticipant: 250000,
    subtotal: 750000,
    adminFee: 5000,
    totalPayment: 755000,
  },
  qrCode: "", // Using the logo as a placeholder for QR code
};

interface PaymentPageProps {
  params: {
    id: string;
  };
}

export default function PaymentPage({ params }: PaymentPageProps) {
  // In a real app, you would fetch the payment data based on the ID
  if (params.id !== "PAY-001") {
    notFound();
  }

  const isExpired = new Date(payment.expiresAt) < new Date();
  const isPending = payment.status === "pending" && !isExpired;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Payment Details</h1>
      </div>

      {isPending && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">
                  Payment Pending
                </h3>
                <p className="text-sm text-yellow-700">
                  Please complete your payment before the deadline to confirm
                  your registration.
                </p>
                <div className="mt-2">
                  <PaymentCountdown expiresAt={payment.expiresAt} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Payment details for your Math Olympiad registration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Payment ID</div>
                <div className="font-medium">{payment.id}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Created On</div>
                <div>{payment.createdAt}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Payment Deadline
                </div>
                <div className="flex items-center gap-2">
                  <span>{payment.expiresAt}</span>
                  {isPending && <Clock className="w-4 h-4 text-yellow-600" />}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 font-semibold">Payment Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Participants
                    </span>
                    <span>{payment.details.totalParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Price per Participant
                    </span>
                    <span>
                      Rp{" "}
                      {payment.details.pricePerParticipant.toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      Rp {payment.details.subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Admin Fee</span>
                    <span>
                      Rp {payment.details.adminFee.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total Payment</span>
                    <span>
                      Rp {payment.details.totalPayment.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {/* <DownloadReceiptButton
                paymentId={payment.id}
                disabled={payment.status !== "completed"}
              /> */}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Complete your payment using QRIS
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="flex items-center justify-center p-2 mb-4 bg-green-100 rounded-full">
                <QrCode className="w-6 h-6 text-green-600" />
              </div>

              <h3 className="mb-4 font-semibold text-center">QRIS Payment</h3>

              <div className="w-full max-w-[200px] mx-auto mb-4">
                {/* <PaymentQRCode qrCode={payment.qrCode} /> */}
              </div>

              <div className="mb-4 text-sm text-center text-muted-foreground">
                Scan the QR code above using your mobile banking or e-wallet app
                to complete the payment.
              </div>

              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </CardContent>
          </Card>

          {/* <div className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  Other Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Bank Transfer</span>
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/payment/bank-transfer">Switch Method</Link>
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
}
