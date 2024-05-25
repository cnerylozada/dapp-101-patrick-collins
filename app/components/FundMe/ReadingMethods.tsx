import { MinimumAmountToFeed } from "./MinimumAmountToFeed";
import { GetAmountByAddressForm } from "./GetAmountByAddressForm";
import {
  fundMecontractAddress,
  useFetchFundMeContract,
} from "@/utils/fundMeContract";

export const ReadingMethods = () => {
  const { data: abi, isLoading } = useFetchFundMeContract();

  return (
    <>
      {isLoading ? (
        <div>Loading ABI code... </div>
      ) : (
        <>
          <div className="p-4 rounded-md bg-blue-50">
            <div className="mb-3 border-b-2 text-blue-500 font-bold">
              Read Contract
            </div>
            <div className="space-y-4">
              <MinimumAmountToFeed abi={abi} address={fundMecontractAddress} />
              <GetAmountByAddressForm
                abi={abi}
                address={fundMecontractAddress}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
