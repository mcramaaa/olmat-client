"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface BackButtonProps {
  fallbackUrl?: string;
  className?: string;
}

export default function BackButton({
  fallbackUrl = "/participants",
  className,
}: BackButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    // Check if we have a stored return URL in the URL params
    const returnUrl = searchParams.get("returnUrl");

    if (returnUrl) {
      router.push(decodeURIComponent(returnUrl));
    } else {
      // If no return URL is specified, go to the fallback URL
      router.push(fallbackUrl);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleBack}
      className={className}
    >
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );
}
