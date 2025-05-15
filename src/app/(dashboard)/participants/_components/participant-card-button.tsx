"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { useLayout } from "@/hooks/zustand/layout";

interface ParticipantCardButtonProps {
  id: string;
  name: string;
  school: string;
  region: string;
  imgUrl: string;
  disabled?: boolean;
}

export function ParticipantCardButton({
  id,
  imgUrl,
  name,
  region,
  school,
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

      // Get the participant image through our proxy
      const participantImageUrl = `/api/proxy-image?path=${encodeURIComponent(
        `imgs/${imgUrl}`
      )}`;

      // For the ID card template, assuming it's in your public folder
      // If it's also on your backend, adjust the path accordingly
      const idCardTemplate = "/idcard.webp";

      // Load both images
      const [participantImageDataUrl, idCardTemplateDataUrl] =
        await Promise.all([
          loadImage(participantImageUrl),
          loadImage(idCardTemplate),
        ]);

      // Add background image
      doc.addImage({
        imageData: idCardTemplateDataUrl,
        x: 0,
        y: 0,
        width: 148, // A5 width
        height: 210, // A5 height
      });

      // Add participant photo (in the placeholder area)
      doc.addImage({
        imageData: participantImageDataUrl,
        x: 57, // Center of the placeholder
        y: 45,
        width: 34,
        height: 48,
      });

      // Add participant details
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255); // Black text

      // Add participant name
      doc.text(name || "", 31, 115, { align: "left" });

      // Add participant ID
      doc.text(id || "", 31, 139, { align: "left" });

      // Add school name
      doc.text(school || "", 31, 162.5, { align: "left" });

      // Add rayon
      doc.text(region || "", 31, 186.4, { align: "left" });

      // Save the PDF
      doc.save(`Kartu Peserta-${id}-${name}.pdf`);

      setIsSuccess(true, "Participant card downloaded");
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError(true, "Failed to download participant card");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to load an image and convert it to a data URL
  const loadImage = async (src: string): Promise<string> => {
    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to load image: ${response.statusText}`);
      }
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error loading image:", error);
      throw error;
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
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current rounded-full animate-spin border-t-transparent" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      <span className="sr-only">Download Card</span>
    </Button>
  );
}
