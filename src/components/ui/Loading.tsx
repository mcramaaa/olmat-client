import { Loader2 } from "lucide-react";
import React from "react";

interface IProps {
  message?: string;
}

export default function AppLoading({ message = "Loading" }: IProps) {
  return (
    <div className="flex items-center justify-center w-full h-[60vh] ">
      <div className="flex items-center gap-3 px-5 py-2 bg-white rounded-lg drop-shadow-md">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        {message}
      </div>
    </div>
  );
}
