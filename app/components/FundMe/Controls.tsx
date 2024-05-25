import { useWeb3Modal } from "@web3modal/wagmi/react";

export const Controls = () => {
  const { open } = useWeb3Modal();

  return (
    <div className="p-4 flex items-center space-x-3">
      <p>Please connect to sepolia</p>
      <button
        className="p-2 rounded-md bg-yellow-300"
        onClick={() => {
          open({ view: "Networks" });
        }}
      >
        Connect to sepolia
      </button>
    </div>
  );
};
