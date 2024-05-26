"use client";
import { ITransaction } from "@/models/fundMe.model";
import { useQuery } from "@tanstack/react-query";

export default function MyTransactionById() {
  return (
    <div className="p-4">
      <div className="p-4 rounded-md bg-blue-50">
        <div className="mb-3 border-b-2 text-blue-500 font-bold">
          My Transaction
        </div>
        <div className="space-y-4"></div>
      </div>
    </div>
  );
}
