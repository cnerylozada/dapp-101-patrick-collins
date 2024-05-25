import { Abi, Address } from "viem";
import { useReadContract } from "wagmi";

export const MinimumAmountToFeed = ({
  abi,
  address,
}: {
  abi: Abi;
  address: Address;
}) => {
  const {
    data: MINIMUN_USD_AMOUNT,
    isLoading,
    isSuccess,
  } = useReadContract({
    abi,
    address,
    functionName: "MINIMUN_USD_AMOUNT",
  });

  return (
    <div>
      <p>
        <span className="font-bold">MINIMUN_USD_AMOUNT:</span>{" "}
        {isLoading && <span>Loading ... </span>}
        {isSuccess && <span>USD ${`${MINIMUN_USD_AMOUNT}`}</span>}
      </p>
    </div>
  );
};
