import { Hash } from "viem";

export const localhostChainId = 31337;

export const blockChainId = {
  sepolia: 11155111,
  localhost: localhostChainId,
};

export const formatTx = (txHash: string) => {
  const length = txHash.length;
  const charsToShow = 10;
  return `${txHash.substring(0, charsToShow)}...${txHash.substring(
    length - charsToShow,
    length
  )}`;
};
