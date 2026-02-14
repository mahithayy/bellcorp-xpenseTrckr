import React from "react";
export default function TransactionList({ transactions }) {
  return (
    <div className="space-y-2">
      // src/components/TransactionList.jsx

{transactions.map((tx) => (
  <div
    key={tx._id}
    className="group flex justify-between items-center bg-white border border-slate-100 p-4 rounded-xl hover:bg-slate-50 transition-colors mb-3 last:mb-0"
  >
    <div className="flex items-center gap-4">
        {/* Category Icon Placeholder */}
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
            {tx.category.substring(0, 2).toUpperCase()}
        </div>
        <div>
            <h3 className="font-semibold text-slate-800">{tx.title}</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wide">{tx.category}</p>
        </div>
    </div>

    <div className="text-right">
        <span className="block font-bold text-slate-900">- ₹{tx.amount}</span>
        <span className="text-xs text-slate-400">{new Date(tx.date).toLocaleDateString()}</span>
    </div>
  </div>
))}
    </div>
  );
}
