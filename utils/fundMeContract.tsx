import { useQuery } from "@tanstack/react-query";

export const fundMecontractAddress =
  "0x6c0387f7ab6c72118e54afb98a1591b5ca7d636d";

export const useFetchFundMeContract = (enabled?: boolean) => {
  const { data, isLoading } = useQuery({
    queryKey: ["fundMeABICode"],
    queryFn: () =>
      fetch(
        `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${fundMecontractAddress}&format=raw`
      ).then((res) => res.json()),
    enabled: enabled ? enabled : true,
  });
  return { data, isLoading };
};
