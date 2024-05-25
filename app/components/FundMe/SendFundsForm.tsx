import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAccount, useWriteContract } from "wagmi";
import { Abi, Address, Hash, parseEther } from "viem";
import Link from "next/link";
import { ISaveTransactionDto } from "@/models/fundMe.model";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  funds: z.string().regex(/\d+\.?\d*/),
});
type FundsClient = z.infer<typeof schema>;

export const SendFundsForm = ({
  abi,
  contractAddress,
}: {
  abi: Abi;
  contractAddress: Address;
}) => {
  const { address } = useAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FundsClient>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (newTransaction: ISaveTransactionDto) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_FSDAPP1_DB}/fsDapp1/fundMe/saveTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTransaction),
        }
      );
    },
  });

  const saveTransaction = async (txHash: Hash, ethAmount: number) => {
    const newTransaction: ISaveTransactionDto = {
      txHash,
      funderAddress: address as string,
      ethAmount,
    };
    mutation.mutate(newTransaction);
  };

  const {
    data: txHash,
    writeContract,
    isSuccess,
    error,
    isError,
    status,
  } = useWriteContract();
  const onSubmit: SubmitHandler<FundsClient> = async (data) => {
    const funds = +data.funds;
    writeContract(
      {
        abi,
        address: contractAddress,
        functionName: "fund",
        value: parseEther(`${funds}`),
      },
      {
        onSuccess: (_) => {
          saveTransaction(_, funds);
        },
      }
    );
  };

  return (
    <div>
      <div className="font-bold uppercase">Send funds:</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-4">
          <div>
            <input
              className="w-full md:w-80 p-2"
              placeholder="0.00"
              {...register("funds")}
            />
            {errors.funds && (
              <div className="text-xs text-red-700">{errors.funds.message}</div>
            )}
          </div>
          <div>
            <button type="submit" className="p-2 rounded-md bg-yellow-300">
              Send funds
            </button>
          </div>
        </div>
      </form>
      <div>
        {status === "pending" && <div>Waiting for confirmation .... </div>}
        {isSuccess && (
          <div>
            <span className="text-green-600 font-bold">Kudos ! </span>
            <Link
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              className="text-blue-700 underline text-sm"
              target="_blank"
            >
              See your transaction here
            </Link>
          </div>
        )}
        {isError && (
          <div className="text-red-700">{(error as any).shortMessage}</div>
        )}
      </div>
    </div>
  );
};
