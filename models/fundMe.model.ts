export interface ISaveTransactionDto {
  txHash: string;
  funderAddress: string;
  ethAmount: number;
}

export interface ITransaction {
  id: string;
  txHash: string;
  funderAddress: string;
  ethAmount: number;
  wasConfirmed: boolean;
  createdAt: number;
  updatedAt: number;
}
