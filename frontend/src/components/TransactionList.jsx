import React from "react";
export default function TransactionList({ transactions }) {
  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
        >
          <div>
            <h3 className="font-medium">{tx.title}</h3>
            <p className="text-sm text-gray-500">{tx.category}</p>
          </div>
          <span className="font-semibold">₹{tx.amount}</span>
        </div>
      ))}
    </div>
  );
}
