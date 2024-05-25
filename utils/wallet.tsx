import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { blockChainId } from ".";

export const useWalletConnection = () => {
  const { address, isDisconnected } = useAccount();
  return { isWallecConnected: isDisconnected || !address };
};

export const useCheckWalletAndChain = () => {
  const { selectedNetworkId } = useWeb3ModalState();
  const { isWallecConnected } = useWalletConnection();
  const isCorrectNetworkChoosen =
    +`${selectedNetworkId}` !== blockChainId.sepolia;
  return { isWallecConnected, isCorrectNetworkChoosen };
};
