import React, { useState } from "react";
import API from "../api/axios";

export default function TransactionForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    notes: "" // new field
  });

  const submit = async () => {
  try {
    await API.post("/transactions", {
      ...form,
      amount: Number(form.amount),
    });

    await refresh(); // wait for reload

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
    <div className="p-4 border rounded mb-4">
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
  value={form.notes || ""}
  onChange={(e) => setForm({ ...form, notes: e.target.value })}
/>

      <button className="bg-blue-500 text-white px-3 py-1" onClick={submit}>
        Add
      </button>
    </div>
  );
}
