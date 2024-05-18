import { useQuery } from "@tanstack/react-query";
import { Contract } from "./Contract";
import { FundsForm } from "./FundsForm";

export const ContractInteraction = () => {
  const contractAddress = "0x6c0387f7ab6c72118e54afb98a1591b5ca7d636d";
  const { data, isLoading } = useQuery({
    queryKey: ["fundMeABICode"],
    queryFn: () =>
      fetch(
        `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&format=raw`
      ).then((res) => res.json()),
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading ABI code... </div>
      ) : (
        <>
          <Contract abi={data} address={contractAddress} />
          <FundsForm />
        </>
      )}
    </div>
  );
};
