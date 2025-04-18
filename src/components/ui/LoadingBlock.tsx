"use client";

import { useLayout } from "@/hooks/zustand/layout";
import { Loader2 } from "lucide-react";
import React from "react";

export default function LoadingBlock() {
  const { isMessage } = useLayout();
  return (
    <div className="absolute w-screen h-screen bg-white/50 grid place-items-center z-[100]">
      <div className="w-fit h-fit bg-white shadow-md rounded-2xl p-5 border flex items-center">
        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
        {isMessage}
      </div>
    </div>
  );
}
