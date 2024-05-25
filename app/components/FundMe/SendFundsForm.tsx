import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useWriteContract } from "wagmi";
import { Abi, Address, parseEther } from "viem";
import Link from "next/link";

const schema = z.object({
  funds: z.string().regex(/\d+\.?\d*/),
});
type FundsClient = z.infer<typeof schema>;

export const SendFundsForm = ({
  abi,
  address,
}: {
  abi: Abi;
  address: Address;
}) => {
  const {
    data: txHash,
    writeContract,
    isSuccess,
    error,
    isError,
    status,
  } = useWriteContract();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FundsClient>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FundsClient> = async (data) => {
    writeContract({
      abi,
      address,
      functionName: "fund",
      value: parseEther(`${+data.funds}`),
    });
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
