import { Abi, Address } from "viem";
import { SendFundsForm } from "./SendFundsForm";

export const WriteContractMethods = ({
  abi,
  address,
}: {
  abi: Abi;
  address: Address;
}) => {
  return (
    <div className="p-4 rounded-md bg-gray-100">
      <div className="mb-3 border-b-2 text-blue-500 font-bold">
        Write Contract Methods
      </div>
      <SendFundsForm abi={abi} address={address} />
    </div>
  );
};
