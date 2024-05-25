"use client";
import { useWalletConnection } from "@/utils/wallet";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";

export const Navbar = () => {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { isWallecConnected } = useWalletConnection();
  const { address } = useAccount();

  return (
    <div className="p-4 flex items-center bg-gray-800 border-b-2">
      <div className="w-40 font-bold text-white">
        <Link href={"/"}>Cristh Dapp</Link>
      </div>
      <div className="flex-grow flex justify-end">
        <div>
          {isWallecConnected ? (
            <button onClick={() => open()} className="text-white">
              Open Connect Modal
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <div>
                <w3m-account-button />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
