"use client";
import { ITransaction } from "@/models/fundMe.model";
import { formatTx } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Hash } from "viem";
import { useTransactionConfirmations } from "wagmi";

export default function MyTransactionById() {
  const MIN_NUMBER_OF_CONFIRMATIONS = 3;
  const { txHash } = useParams();

  const {
    data: numOfConfirmations,
    isLoading: isLoadingTxConfirmations,
    isSuccess: wasNumConfFetchingSuccessfully,
  } = useTransactionConfirmations({
    hash: txHash as Hash,
    query: {
      enabled: !!txHash,
    },
  });
  const isValidTransaction =
    !!numOfConfirmations && numOfConfirmations >= MIN_NUMBER_OF_CONFIRMATIONS;

  const {
    data: txDetail,
    isLoading: isTxLoading,
    isSuccess: isSuccessTx,
  } = useQuery({
    queryKey: ["get-transaction-by-id"],
    enabled: isValidTransaction,
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_FSDAPP1_DB}/fsDapp1/fundMe/transactions/${txHash}`
      )
        .then((_) => _.json())
        .then((_: { response: ITransaction }) => _.response),
  });

  return (
    <div className="p-4">
      <div className="p-4 rounded-md bg-blue-50">
        <div className="mb-3 border-b-2 text-blue-500 font-bold">
          My Transaction
        </div>
        {isLoadingTxConfirmations && (
          <div>Loading number of confirmations ...</div>
        )}

        {wasNumConfFetchingSuccessfully && !isValidTransaction && (
          <div>Wait a bit to confirm the transaction by the book</div>
        )}

        {isTxLoading && <div>Loading transaction detail...</div>}
        {isSuccessTx && txDetail && (
          <>
            <div className="space-y-4">
              <p>
                <span className="font-bold uppercase">FunderAddress:</span>{" "}
                <span>{formatTx(txDetail.funderAddress)}</span>
              </p>
              <p>
                <span className="font-bold uppercase">EthAmount:</span>{" "}
                <span>{txDetail.ethAmount}</span>
              </p>
              <p>
                <span className="font-bold uppercase">CreatedAt:</span>{" "}
                <span>{txDetail.createdAt}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
