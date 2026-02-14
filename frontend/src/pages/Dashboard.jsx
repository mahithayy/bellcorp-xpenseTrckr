import React, { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
const [userName, setUserName] = useState("User");
  const load = useCallback(async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data.data || []);
      const userRes = await API.get("/auth/me");
      setUserName(userRes.data.name);
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
//const userName = localStorage.getItem("userName") || "User";
  return (
  <div className="p-6 max-w-5xl mx-auto space-y-8">
    <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
        <span className="text-sm text-slate-400">Welcome back, {userName}</span>
    </div>

    {/* Welcome Helper */}
    {transactions.length === 0 && (
      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-indigo-700 flex items-center gap-2">
        <span>👋</span> To get started, add your first expense below.
      </div>
    )}

    {/* Summary Cards */}
    <div className="grid md:grid-cols-3 gap-6">
      {/* Total Expense Card - Highlighted */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl shadow-xl text-white">
        <h2 className="text-indigo-100 text-sm font-medium uppercase tracking-wider">Total Expenses</h2>
        <p className="text-4xl font-bold mt-2">₹{total.toLocaleString()}</p>
        <div className="mt-4 text-xs text-indigo-200 bg-white/10 inline-block px-2 py-1 rounded">
            Running Total
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Spend by Category</h2>
        {Object.keys(categoryTotals).length === 0 ? (
          <p className="text-slate-400 text-sm italic">No data available yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(categoryTotals).map(([cat, amt]) => (
              <div key={cat} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-700">{cat}</span>
                <span className="font-bold text-slate-900">₹{amt}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Split View: Add Form & Recent List */}
    <div className="grid md:grid-cols-3 gap-6">
      {/* Left: Add Transaction */}
      {/* Left: Add Transaction */}
<div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 h-fit">
  <h2 className="font-bold text-lg mb-4 text-slate-800">New Expense</h2>
  {/* Pass the check: Is the list length > 0? */}
  <TransactionForm refresh={load} hasData={transactions.length > 0} />
</div>

      {/* Right: Recent Transactions */}
      <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-slate-800">Recent Activity</h2>
            <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
        </div>

        {recent.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">No recent transactions.</p>
        ) : (
          <TransactionList transactions={recent} />
        )}
      </div>
    </div>
  </div>
);
}
