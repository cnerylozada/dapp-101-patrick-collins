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
        <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
          <Link href={"kfund-me/add-funds"} className="block md:inline">
            <button
              type="button"
              className="p-2 w-full md:w-auto rounded-md bg-yellow-300"
            >
              Go to Add funds
            </button>
          </Link>

          <Link href={"fund-me/my-transactions"} className="block md:inline">
            <button
              type="button"
              className="p-2 w-full md:w-auto rounded-md bg-yellow-300"
            >
              Go to My transactions
            </button>
          </Link>

          <Withdraw />
        </div>
      </div>
    </div>
  );
}
