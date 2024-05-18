"use client";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { Controls } from "./Controls";
import { blockChainId } from "@/utils";
import { useConnection } from "@/utils/hooks";
import { ContractInteraction } from "./ContractInteraction";

export const FundMe = () => {
  const { selectedNetworkId } = useWeb3ModalState();
  const { isWallecConnected } = useConnection();
  const isCorrectNetworkChoosen =
    +`${selectedNetworkId}` !== blockChainId.sepolia;

  if (isWallecConnected)
    return (
      <div className="font-bold text-red-500">Connect some wallet pls</div>
    );
  if (isCorrectNetworkChoosen) return <Controls />;

  return (
    <div>
      <div className="font-bold">Fund me</div>
      <ContractInteraction />
    </div>
  );
};
