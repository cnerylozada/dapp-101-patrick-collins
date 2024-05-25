"use client";
import { Controls } from "@/app/components/FundMe/Controls";
import { useCheckWalletAndChain } from "@/utils/wallet";
import { useQuery } from "@tanstack/react-query";

export default function MyTransactionsPage() {
  const { isWallecConnected, isCorrectNetworkChoosen } =
    useCheckWalletAndChain();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-transactions"],
    queryFn: () =>
      fetch(
        `https://9a701rxzrb.execute-api.us-east-2.amazonaws.com/dev/fsDapp1/fundMe/transactions`
      ).then((_) => _.json()),
    enabled: isWallecConnected && isCorrectNetworkChoosen,
  });

  if (isWallecConnected)
    return (
      <div className="font-bold text-red-500">Connect some wallet pls</div>
    );
  if (isCorrectNetworkChoosen) return <Controls />;

  return (
    <div className="p-4 space-y-4">
      <div>my transactions</div>
      <div>
        {isLoading && <div>Loading ...</div>}
        {isSuccess && data && !data.transactions.length && (
          <div>No transactions to show</div>
        )}
        {isSuccess && data && !!data.transactions.length && (
          <div>{JSON.stringify(data.transactions)}</div>
        )}
      </div>
    </div>
  );
}
