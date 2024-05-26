"use client";
import { ITransaction } from "@/models/fundMe.model";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function MyTransactionsPage() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-transactions"],
    queryFn: (): Promise<{ transactions: ITransaction[] }> =>
      fetch(
        `${process.env.NEXT_PUBLIC_FSDAPP1_DB}/fsDapp1/fundMe/transactions`
      ).then((_) => _.json()),
    select: (_) => _.transactions,
  });

  return (
    <div className="p-4">
      <div className="p-4 rounded-md bg-blue-50">
        <div className="mb-3 border-b-2 text-blue-500 font-bold">
          My Transactions
        </div>
        <div className="space-y-4">
          {isLoading && <div>Loading ...</div>}
          {isSuccess && data && !data.length && (
            <div>No transactions to show</div>
          )}
          {isSuccess && data && !!data.length && (
            <div>
              {data.map((_, index) => (
                <div key={_.id}>
                  <span>{index + 1}. </span>
                  <Link
                    href={`/fund-me/my-transactions/${_.id}`}
                    className="text-blue-700"
                  >
                    {_.id}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
