import { MinimumAmountToFeed } from "./MinimumAmountToFeed";
import { GetAmountByAddressForm } from "./GetAmountByAddressForm";
import {
  fundMecontractAddress,
  useFetchFundMeContract,
} from "@/utils/fundMeContract";
import { getBalance } from "@wagmi/core";
import { config } from "@/config";
import { useQuery } from "@tanstack/react-query";
import { formatEther } from "viem";

export const ReadingMethods = () => {
  const { data: abi, isLoading } = useFetchFundMeContract();
  const {
    data: fundMeBalance,
    isLoading: isBalanceLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["fundMeBalance"],
    queryFn: () =>
      getBalance(config, {
        address: fundMecontractAddress,
      }),
  });

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
              <div>
                <p>
                  <span className="font-bold uppercase">balance:</span>{" "}
                  {isBalanceLoading && <span>Loading ... </span>}
                  {isSuccess && (
                    <span>
                      {`${formatEther(fundMeBalance.value)}`}{" "}
                      {fundMeBalance.symbol}
                    </span>
                  )}
                </p>
              </div>
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
