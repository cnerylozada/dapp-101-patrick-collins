export interface ISaveTransactionDto {
  txHash: string;
  funderAddress: string;
  ethAamount: number;
}

export interface ITransaction {
  id: string;
  txHash: string;
  funderAddress: string;
  ethAamount: number;
  wasConfirmed: boolean;
  createdAt: number;
  updatedAt: number;
}
