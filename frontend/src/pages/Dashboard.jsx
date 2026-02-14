import React, { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const load = useCallback(async () => {
    try {
      const res = await API.get("/transactions");
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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Welcome helper */}
      {transactions.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded text-blue-700">
          To get started, add an expense below 👇
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Expenses</h2>
          <p className="text-3xl font-bold mt-1">₹{total}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm mb-2">Category Breakdown</h2>
          {Object.keys(categoryTotals).length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
          ) : (
            Object.entries(categoryTotals).map(([cat, amt]) => (
              <div key={cat} className="flex justify-between text-sm">
                <span>{cat}</span>
                <span>₹{amt}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Transaction */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Add Expense</h2>
        <TransactionForm refresh={load} />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Recent Transactions</h2>
        {recent.length === 0 ? (
          <p className="text-gray-400 text-sm">No transactions yet</p>
        ) : (
          <TransactionList transactions={recent} />
        )}
      </div>
    </div>
  );
}
