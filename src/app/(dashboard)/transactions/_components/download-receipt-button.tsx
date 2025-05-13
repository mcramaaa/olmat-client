"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import { jsPDF } from "jspdf";
import { useLayout } from "@/hooks/zustand/layout";
import { IPayment } from "@/interfaces/IPayments";
import { convertBirth, convertDateTime, convertRupiah } from "@/helper/common";

interface DownloadReceiptButtonProps {
  transction: IPayment;
  participants: { name: string; birth: Date }[];
  paymentId: string;
  disabled?: boolean;
}

export function DownloadReceiptButton({
  transction,
  participants,
  paymentId,
  disabled = false,
}: DownloadReceiptButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsSuccess, setError } = useLayout();

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      // Create a new PDF document (A5 size)
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      // Add background image (template)
      doc.addImage({
        imageData: "/receipt.webp",
        x: 0,
        y: 0,
        width: 148,
        height: 210,
      });

      // Set font

      // ID Pembayaran
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(transction.invoice || paymentId, 30, 36); // Sesuaikan posisi x, y

      // Tanggal
      doc.setFont("helvetica", "bold");
      doc.text(convertDateTime(transction.createdAt), 30, 40.5); // Sesuaikan posisi x, y

      // Tabel: Asal Sekolah, Harga, Jumlah Peserta, Total
      let yPosition = 55;

      if (participants && participants.length > 0) {
        participants.forEach((participant) => {
          // Name column
          doc.text(participant.name, 10, yPosition, { align: "left" });

          // Birth date column
          const birthDate = convertBirth(participant.birth);
          doc.text(birthDate, 112, yPosition);

          yPosition += 7; // Move down for next participant

          // // Add more rows if needed
          // if (index < participants.length - 1) {
          //   // Draw horizontal line between participants
          //   doc.setLineWidth(0.1);
          //   doc.line(30, yPosition - 7, 180, yPosition - 7);
          // }
        });
      }

      const ytotalPosition = 170;
      doc.setFont("helvetica", "bold");
      doc.text(convertRupiah(transction?.amount) || "", 110, ytotalPosition, {
        align: "left",
      });
      doc.text(
        `${transction.participantAmount} Peserta` || "",
        110,
        ytotalPosition + 4.8,
        {
          align: "left",
        }
      );
      doc.text(convertRupiah(transction.fee) || "", 110, ytotalPosition + 9.6, {
        align: "left",
      });
      doc.text(
        convertRupiah(transction.totalAmount) || "",
        110,
        ytotalPosition + 15.7,
        {
          align: "left",
        }
      );
      // Save the PDF
      doc.save(`receipt-${transction.invoice || paymentId}.pdf`);

      setIsSuccess(true, "Receipt downloaded successfully.");
    } catch (error) {
      setError(true, "Error downloading receipt. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={disabled || isLoading}
      className="w-full"
    >
      <Receipt className="w-4 h-4 mr-2" />
      {isLoading ? "Generating Receipt..." : "Download Invoice"}
    </Button>
  );
}
