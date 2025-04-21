import type { Metadata } from "next";
import { getInvAction } from "../transaction.action";
import TransactionDetailClient from "../_components/TransactionDetailClient";
import BackButton from "@/components/ui/BackButton";

export const metadata: Metadata = {
  title: "Transaction Details - Math Olympiad 2025",
  description: "View transaction details",
};

interface TransactionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TransactionPage({
  params,
}: TransactionPageProps) {
  const { slug } = await params;

  const res = await getInvAction(slug);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight">Detail Transaksi</h1>
      </div>
      <TransactionDetailClient
        participants={res.participants || []}
        transaction={res.data}
      />
    </div>
  );
}
