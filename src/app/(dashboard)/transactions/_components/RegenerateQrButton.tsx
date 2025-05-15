"use client";

import { Button } from "@/components/ui/button";
import { useLayout } from "@/hooks/zustand/layout";
import React from "react";
import { regenerateQrAction } from "../transaction.action";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function RegenerateQrButton({ id }: { id?: number }) {
  const router = useRouter();
  const { setIsSuccess, setError, setIsLoading, isLoading } = useLayout();
  const handleRegenerate = async (payId: number) => {
    setIsLoading(true);
    try {
      const res = await regenerateQrAction(payId);
      setIsSuccess(true, "QRIS telah diperbarui");
      router.push(`/transactions/${res.data.payment.invoice}`);
    } catch (error) {
      setError(true, "Gagal memperbarui QRIS");
      throw error as AxiosError;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={() => handleRegenerate(id as number)}
      className="w-full"
      disabled={isLoading || !id}
    >
      {isLoading ? (
        <div>
          <LoaderIcon className="animate-spin" /> Meminta QR Baru
        </div>
      ) : (
        "Minta QR Baru"
      )}
    </Button>
  );
}
