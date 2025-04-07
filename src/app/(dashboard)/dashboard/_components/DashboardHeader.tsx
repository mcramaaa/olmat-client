import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DashboardHeader() {
  return (
    <div className="bg-white border-b z-40 flex justify-center lg:justify-between duration-300 px-4 items-center font-bold text-2xl h-[55px] lg:h-[70px] py-2 w-full sticky top-0">
      <h2>OLMAT UINSA</h2>
      <div className="fixed right-0 items-center h-[55px] lg:h-[70px] flex px-5">
        <Link href="/" className="md:hidden">
          <House />
        </Link>
        <Button
          asChild
          variant="default"
          className="bg-[#0f172a] hover:bg-[#1e293b]"
        >
          <Link href="/" className="hidden md:block">
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
