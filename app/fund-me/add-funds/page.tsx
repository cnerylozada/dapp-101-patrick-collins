"use client";
import { useCheckWalletAndChain } from "@/utils/wallet";
import { Controls } from "@/app/components/FundMe/Controls";
import { SendFundsForm } from "@/app/components/FundMe/SendFundsForm";
import {
  fundMecontractAddress,
  useFetchFundMeContract,
} from "@/utils/fundMeContract";

export default function AddFundsPage() {
  const { isWallecConnected, isCorrectNetworkChoosen } =
    useCheckWalletAndChain();
  const { data: abi, isLoading } = useFetchFundMeContract(
    isWallecConnected && isCorrectNetworkChoosen
  );

  if (isWallecConnected)
    return (
      <div className="font-bold text-red-500">Connect some wallet pls</div>
    );
  if (isCorrectNetworkChoosen) return <Controls />;

  return (
    <div className="p-4">
      {isLoading ? (
        <div>Loading ABI code... </div>
      ) : (
        <div className="p-4 rounded-md bg-gray-100">
          <div className="mb-3 border-b-2 text-blue-500 font-bold">
            Write Contract
          </div>
          <SendFundsForm abi={abi} contractAddress={fundMecontractAddress} />
        </div>
      )}
    </div>
  );
}
