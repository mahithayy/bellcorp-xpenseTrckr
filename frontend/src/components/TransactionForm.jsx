import React, { useState } from "react";
import API from "../api/axios";

export default function TransactionForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: ""
  });

  const isTyping = form.title || form.amount || form.category;

  const submit = async () => {
    try {
      await API.post("/transactions", {
        ...form,
        amount: Number(form.amount),
      });

      await refresh();

      setForm({
        title: "",
        amount: "",
        category: "",
        date: "",
        notes: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-3">
      {!isTyping && (
        <p className="text-sm text-gray-500">
          Start by entering your first expense ✨
        </p>
      )}

      <input
        placeholder="Expense name"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Amount"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <input
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <button
  className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 font-bold transition-transform active:scale-95"
  onClick={submit}
>
  + Add Expense
</button>
    </div>
  );
}
