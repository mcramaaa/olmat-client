import type { Metadata } from "next";
import { getTransactionAction } from "./transaction.action";
import TransactionClient from "./_components/TransactionClient";
import { ISearchParams } from "@/interfaces/ISearchParams";

export const metadata: Metadata = {
  title: "Transactions - Math Olympiad 2025",
  description: "Manage your Math Olympiad transactions",
};

interface IProps {
  searchParams: ISearchParams;
}

export default async function TransactionsPage({ searchParams }: IProps) {
  const page = Number((await searchParams)?.page) || 1;
  const limit = Number((await searchParams)?.limit) || 10;

  const res = await getTransactionAction(page, limit);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-gray-500">Manage your payment transactions</p>
      </div>
      <TransactionClient
        transactions={res.data || []}
        metadata={res.metaData}
        params={{ page, limit }}
      />
    </div>
  );
}
