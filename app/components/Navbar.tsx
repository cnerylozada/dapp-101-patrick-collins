"use client";
import { useConnection } from "@/utils/hooks";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

export const Navbar = () => {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { isWallecConnected } = useConnection();
  const { address } = useAccount();

  return (
    <div className="p-4 flex bg-yellow-100 border-b-2">
      <div className="w-40">Cristh Dapp</div>
      <div className="flex-grow flex justify-end">
        <div>
          {isWallecConnected ? (
            <button onClick={() => open()}>Open Connect Modal</button>
          ) : (
            <div className="flex items-center space-x-4">
              <div>{address}</div>
              <div>
                <button onClick={() => disconnect()}>Disconnect</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
