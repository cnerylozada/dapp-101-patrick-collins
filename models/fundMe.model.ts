import { Hash } from "viem";

export interface ISaveTransactionDto {
  txHash: Hash;
  funderAddress: string;
  ethAmount: number;
}

export interface ITransaction {
  id: Hash;
  funderAddress: string;
  ethAmount: number;
  wasConfirmed: boolean;
  createdAt: number;
  updatedAt: number;
}
