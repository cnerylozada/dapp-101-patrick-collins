import { useAccount } from "wagmi";

export const useConnection = () => {
  const { address, isDisconnected } = useAccount();
  return { isWallecConnected: isDisconnected || !address };
};
