import React, { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const load = useCallback(async () => {
  try {
    const res = await API.get("/transactions");
    console.log("Loaded:", res.data);

    //  handle paginated response
    setTransactions(res.data.data || []);
  } catch (err) {
    console.error("Load failed:", err);
  }
}, []);


  useEffect(() => {
    load();
  }, [load]);

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const categoryTotals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const recent = transactions.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold">Total Expenses</h2>
        <p className="text-xl font-bold">₹{total}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Category Breakdown</h2>
        {Object.entries(categoryTotals).map(([cat, amt]) => (
          <p key={cat}>{cat}: ₹{amt}</p>
        ))}
      </div>

      <TransactionForm refresh={load} />

      <div>
        <h2 className="font-semibold mb-2">Recent Transactions</h2>
        <TransactionList transactions={recent} />
      </div>
    </div>
  );
}
