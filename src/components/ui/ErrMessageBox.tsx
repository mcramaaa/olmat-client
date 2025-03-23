import { Frown } from "lucide-react";
import React from "react";

interface IProps {
  message?: string;
}

export default function ErrMessageBox({ message }: IProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 mb-4 text-sm text-red-700 border border-red-200 rounded bg-red-50">
      <div className="w-12">
        <Frown />
      </div>
      <p>{message}</p>
    </div>
  );
}
