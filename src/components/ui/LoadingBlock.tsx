"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function LoadingBlock() {
  const [progress, setProgress] = useState(0);
  console.log(progress);

  // Simulate progress for demonstration
  // In a real application, you would update this based on actual loading progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute w-screen h-screen bg-white/50 grid place-items-center z-[100]">
      <div className="w-80 max-w-[90vw] bg-white shadow-md rounded-2xl p-5 border flex flex-col items-center">
        <div className="flex items-center mb-4">
          <Loader2 className="w-6 h-6 mr-2 animate-spin" />
          <span>Mengirim data, mohon tunggu...</span>
        </div>
        <div className="w-full">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
