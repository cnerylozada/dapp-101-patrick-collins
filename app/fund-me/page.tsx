"use client";
import { useCheckWalletAndChain } from "@/utils/wallet";
import { Controls } from "../components/FundMe/Controls";
import { ReadingMethods } from "../components/FundMe/ReadingMethods";
import Link from "next/link";
import { Withdraw } from "../components/FundMe/Withdraw";

export default function FundMeHomePage() {
  const { isWallecConnected, isCorrectNetworkChoosen } =
    useCheckWalletAndChain();
  if (isWallecConnected)
    return (
      <div className="font-bold text-red-500">Connect some wallet pls</div>
    );
  if (isCorrectNetworkChoosen) return <Controls />;

  return (
    <div className="p-4 space-y-4">
      <ReadingMethods />

      <div className="p-4 rounded-md bg-gray-100">
        <div className="mb-3 border-b-2 text-blue-500 font-bold">
          Write Contract
        </div>
        <div className="flex space-x-4">
          <div>
            <Link href={"fund-me/add-funds"}>
              <button type="button" className="p-2 rounded-md bg-yellow-300">
                Go to Add funds
              </button>
            </Link>
          </div>
          <div>
            <Link href={"fund-me/my-transactions"}>
              <button type="button" className="p-2 rounded-md bg-yellow-300">
                Go to My transactions
              </button>
            </Link>
          </div>
          <Withdraw />
        </div>
      </div>
    </div>
  );
}
