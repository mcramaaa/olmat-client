"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { useLayout } from "@/hooks/zustand/layout";

interface Participant {
  id: string;
  name: string;
  school: string;
  rayon: string;
  photo: string;
  status: string;
  paymentStatus: string;
}

interface ParticipantCardButtonProps {
  participant: Participant;
  disabled?: boolean;
}

export function ParticipantCardButton({
  participant,
  disabled = false,
}: ParticipantCardButtonProps) {
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

      // Load the background image
      const backgroundImg = new Image();
      backgroundImg.crossOrigin = "anonymous";
      backgroundImg.src =
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/idcard-IOgxy0oifXAO3TwYyhoyGQvIUF4DGc.png";

      // Load the logo
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src =
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/olmat-logo-am4Yu1kqZt6ezOr0hwsWF4c7mKaXZe.png";

      // Load the participant photo
      const photoImg = new Image();
      photoImg.crossOrigin = "anonymous";
      photoImg.src = participant.photo;

      // Wait for images to load
      await Promise.all([
        new Promise<void>((resolve) => {
          backgroundImg.onload = () => resolve();
        }),
        new Promise<void>((resolve) => {
          logoImg.onload = () => resolve();
        }),
        new Promise<void>((resolve) => {
          photoImg.onload = () => resolve();
        }),
      ]);

      // Add background image
      doc.addImage({
        imageData: backgroundImg,
        x: 0,
        y: 0,
        width: 148, // A5 width
        height: 210, // A5 height
      });

      // Add logo
      // doc.addImage({
      //   imageData: logoImg,
      //   x: 64, // Center of page
      //   y: 20,
      //   width: 20,
      //   height: 20,
      // });

      // Add participant photo (in the placeholder area)
      doc.addImage({
        imageData: photoImg,
        x: 57, // Center of the placeholder
        y: 45,
        width: 34,
        height: 48,
      });

      // Add participant details
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.setTextColor(0, 0, 0); // White text for better visibility on the blue background

      // Add participant name
      doc.text(participant.name, 35, 115, { align: "left" });

      // Add participant ID
      doc.text(participant.id, 35, 139, { align: "left" });

      // Add school name
      doc.text(participant.school, 35, 162.5, { align: "left" });

      // Add rayon
      doc.text(participant.rayon, 35, 186.4, { align: "left" });

      // Save the PDF
      doc.save(`participant-card-${participant.id}.pdf`);

      setIsSuccess(true, "Participant card downloaded");
      // toast({
      //   title: "Participant card downloaded",
      //   description: "The participant card has been downloaded successfully.",
      // });
    } catch (error) {
      setError(true, "Failed Participant card downloaded");
      throw error;
      // toast({
      //   title: "Download failed",
      //   description:
      //     "There was an error downloading the participant card. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDownload}
      disabled={disabled || isLoading}
      title={
        disabled
          ? "Only available for approved and paid participants"
          : "Download participant card"
      }
    >
      <Download className="w-4 h-4" />
      <span className="sr-only">Download Card</span>
    </Button>
  );
}
