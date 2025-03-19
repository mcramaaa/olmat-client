"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { useLayout } from "@/src/hooks/zustand/layout";

interface DownloadReceiptButtonProps {
  paymentId: string;
  disabled?: boolean;
}

export function DownloadReceiptButton({
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

      // Set font
      doc.setFont("helvetica");

      // Add logo
      // In a real app, you would use a proper logo image
      // For now, we'll just add text as a placeholder
      doc.setFontSize(24);
      doc.setTextColor(0, 0, 0);
      doc.text("Math Olympiad 2025", 74, 20, { align: "center" });

      // Add receipt title
      doc.setFontSize(16);
      doc.text("PAYMENT RECEIPT", 74, 30, { align: "center" });

      // Add horizontal line
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(20, 35, 128, 35);

      // Add receipt details
      doc.setFontSize(10);
      doc.text("Receipt Number:", 20, 45);
      doc.text(paymentId, 70, 45);

      doc.text("Date:", 20, 52);
      doc.text(new Date().toLocaleDateString(), 70, 52);

      doc.text("Payment Method:", 20, 59);
      doc.text("QRIS", 70, 59);

      // Add another horizontal line
      doc.line(20, 65, 128, 65);

      // Add payment details
      doc.setFontSize(12);
      doc.text("Payment Details", 20, 72);

      doc.setFontSize(10);
      doc.text("Total Participants:", 20, 80);
      doc.text("3", 100, 80, { align: "right" });

      doc.text("Price per Participant:", 20, 87);
      doc.text("Rp 250,000", 100, 87, { align: "right" });

      doc.text("Subtotal:", 20, 94);
      doc.text("Rp 750,000", 100, 94, { align: "right" });

      doc.text("Admin Fee:", 20, 101);
      doc.text("Rp 5,000", 100, 101, { align: "right" });

      // Add final horizontal line
      doc.line(20, 105, 128, 105);

      // Add total
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Total Payment:", 20, 112);
      doc.text("Rp 755,000", 100, 112, { align: "right" });

      // Add footer
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(
        "This is an official receipt for the Math Olympiad 2025.",
        74,
        130,
        { align: "center" }
      );
      doc.text("Thank you for your participation!", 74, 135, {
        align: "center",
      });

      // Save the PDF
      doc.save(`receipt-${paymentId}.pdf`);

      setIsSuccess(true, "Receipt downloaded successfully.");
      // toast({
      //   title: "Receipt downloaded",
      //   description: "Your receipt has been downloaded successfully.",
      // });
    } catch (error) {
      setError(true, "Error downloading receipt. Please try again.");

      throw error;
      // toast({
      //   title: "Download failed",
      //   description:
      //     "There was an error downloading your receipt. Please try again.",
      //   variant: "destructive",
      // });
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
      <Download className="w-4 h-4 mr-2" />
      {isLoading ? "Generating Receipt..." : "Download Receipt"}
    </Button>
  );
}
