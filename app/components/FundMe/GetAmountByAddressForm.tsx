"use-client";

import { Abi, Address, formatEther } from "viem";
import { useReadContract } from "wagmi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  address: z
    .string()
    .refine(
      (value) => /^(0x)?[0-9a-fA-F]{40}$/.test(value ?? ""),
      "Only valid ethereum address"
    ),
});
type AddressClient = z.infer<typeof schema>;

export const GetAmountByAddressForm = ({
  abi,
  address,
}: {
  abi: Abi;
  address: Address;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AddressClient>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const onSubmit: SubmitHandler<AddressClient> = () => {
    refetch().then((_) => {
      setLastResponse(_.data as bigint);
    });
  };

  const [lastResponse, setLastResponse] = useState<bigint>();
  const { refetch, isFetching } = useReadContract({
    abi,
    address,
    functionName: "addressToAmountFunded",
    args: [watch("address")],
    query: {
      enabled: false,
    },
  });

  return (
    <div>
      <div className="font-bold uppercase">addressToAmountFunded:</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4">
          <div>
            <input
              placeholder="0xc0ffee254729296a45a3885639AC7E10F9d54979"
              className="w-full md:w-80 p-2"
              {...register("address")}
            />
            {errors.address && (
              <div className="text-xs text-red-700">
                {errors.address.message}
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="p-2 rounded-md bg-yellow-300"
              disabled={isFetching}
            >
              Check amount
            </button>
          </div>
        </div>
      </form>
      <div>
        {isFetching && <div>Fetching amount founded...</div>}
        {!!lastResponse && <span>{`${formatEther(lastResponse)}`} ETH</span>}
      </div>
    </div>
  );
};
