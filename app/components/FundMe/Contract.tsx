"use-client";

import { Abi, Address } from "viem";
import { useReadContract } from "wagmi";

export const Contract = ({ abi, address }: { abi: Abi; address: Address }) => {
  const { data, isLoading } = useReadContract({
    abi,
    address,
    functionName: "MINIMUN_USD_AMOUNT",
  });

  return (
    <div>
      <div>Contract</div>
      <div>
        {isLoading ? (
          <div>Loading ... </div>
        ) : (
          <div>
            <p>
              <span className="font-bold">MINIMUN_USD_AMOUNT:</span>{" "}
              <span>USD ${`${data}`}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
