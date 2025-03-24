import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getInvAction } from "../transaction.action";
import TransactionDetailClient from "../_components/TransactionDetailClient";

export const metadata: Metadata = {
  title: "Transaction Details - Math Olympiad 2025",
  description: "View transaction details",
};

interface TransactionPageProps {
  params: {
    slug: string;
  };
}

export default async function TransactionPage({
  params,
}: TransactionPageProps) {
  const { slug } = await params;

  const res = await getInvAction(slug);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/transactions">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Transaction Details
        </h1>
      </div>
      <TransactionDetailClient
        participants={res.participants || []}
        transaction={res.data}
      />
    </div>
  );
}
