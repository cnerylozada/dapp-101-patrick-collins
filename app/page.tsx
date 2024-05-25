import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4">
      <div>
        <Link href={"/fund-me"}>
          <button type="button" className="p-2 rounded-md bg-yellow-300">
            Go FundMe Contract
          </button>
        </Link>
      </div>
    </main>
  );
}
