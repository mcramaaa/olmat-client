import type { Metadata } from "next";
import { getTransactionAction } from "./transaction.action";
import TransactionClient from "./_components/TransactionClient";

export const metadata: Metadata = {
  title: "Transactions - Math Olympiad 2025",
  description: "Manage your Math Olympiad transactions",
};

// Mock data for transactions

export default async function TransactionsPage() {
  const res = await getTransactionAction();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-gray-500">Manage your payment transactions</p>
      </div>
      <TransactionClient transactions={res.data || []} />
    </div>
  );
}
