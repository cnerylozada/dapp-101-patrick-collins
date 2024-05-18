"use client";
import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { Controls } from "./Controls";
import { blockChainId } from "@/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { useConnection } from "@/utils/hooks";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export const FundMe = () => {
  const { selectedNetworkId } = useWeb3ModalState();
  const { isWallecConnected } = useConnection();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  if (isWallecConnected)
    return (
      <div className="font-bold text-red-500">Connect some wallet pls</div>
    );
  if (+`${selectedNetworkId}` !== blockChainId.sepolia) return <Controls />;

  return (
    <div>
      <div className="font-bold">Fund me</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="test" {...register("example")} />
        <input {...register("exampleRequired", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};
