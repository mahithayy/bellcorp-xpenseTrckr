import React,{ useEffect, useState } from "react";
import API from "../api/axios";
import Filters from "../components/Filters";

export default function Explorer() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", amount: "", category: "" });
  const load = async () => {
    const { data } = await API.get("/transactions", {
      params: { ...filters, page },
    });

    setTransactions(data.data);
    setPages(data.pages);
  };
  // --- DELETE FUNCTION ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/transactions/${id}`); // [cite: 662]
      load(); // Refresh list
    } catch (err) {
      alert("Failed to delete");
    }
  };
const handleFilters = (newFilters) => {
  setFilters(newFilters);
  setPage(1); //  reset page when filters change
};
// --- EDIT FUNCTIONS ---
  const startEdit = (tx) => {
  setEditingId(tx._id);
  // Add date (formatted) and notes to the form
  setEditForm({
    title: tx.title,
    amount: tx.amount,
    category: tx.category,
    date: new Date(tx.date).toISOString().split('T')[0], // Format for input type="date"
    notes: tx.notes || ""
  });
};

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/transactions/${id}`, editForm);// [cite: 658]
      setEditingId(null);
      load(); // Refresh list
    } catch (err) {
      alert("Failed to update");
    }
  };
  useEffect(() => {
    load();
  }, [filters, page]);
// load saved filters
useEffect(() => {
  const saved = localStorage.getItem("filters");
  if (saved) setFilters(JSON.parse(saved));
}, []);

// save filters
useEffect(() => {
  localStorage.setItem("filters", JSON.stringify(filters));
}, [filters]);

  return (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-slate-800">Transaction Explorer</h1>

    <Filters setFilters={handleFilters} />

    {/* Empty state */}
    {transactions.length === 0 ? (
      <div className="mt-10 text-center text-slate-400">
        <p className="text-lg">No transactions found.</p>
        <p className="text-sm">Try adjusting your filters.</p>
      </div>
    ) : (
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx._id} className="bg-white border border-slate-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">

            {/* CHECK IF EDITING THIS ROW */}
            {editingId === tx._id ? (
              // === EDIT MODE ===

<div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-indigo-100">
  {/* Row 1: Main Details */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    <input
      className="border p-2 rounded"
      value={editForm.title}
      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
      placeholder="Title"
    />
    <input
      className="border p-2 rounded"
      type="number"
      value={editForm.amount}
      onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
      placeholder="Amount"
    />
    <input
      className="border p-2 rounded"
      value={editForm.category}
      onChange={(e) => setEditForm({...editForm, category: e.target.value})}
      placeholder="Category"
    />
  </div>

  {/* Row 2: Date & Notes (New) */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
     <input
       className="border p-2 rounded"
       type="date"
       value={editForm.date}
       onChange={(e) => setEditForm({...editForm, date: e.target.value})}
     />
     <input
       className="border p-2 rounded md:col-span-2"
       value={editForm.notes}
       onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
       placeholder="Add notes..."
     />
  </div>

  {/* Actions */}
  <div className="flex gap-2 pt-2">
    <button onClick={() => saveEdit(tx._id)} className="bg-green-600 text-white px-4 py-1.5 rounded text-sm hover:bg-green-700 font-medium shadow-sm">
      Save Changes
    </button>
    <button onClick={cancelEdit} className="bg-white border border-slate-300 text-slate-600 px-4 py-1.5 rounded text-sm hover:bg-slate-50 font-medium">
      Cancel
    </button>
  </div>
</div>
            ) : (
              // === VIEW MODE ===
              <div className="flex justify-between items-start">
                <div>
                   <div className="flex items-center gap-3">
                       <h3 className="font-bold text-lg text-slate-800">{tx.title}</h3>
                       <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full uppercase tracking-wider">
                         {tx.category}
                       </span>
                   </div>
                   <p className="text-sm text-slate-500 mt-1">{new Date(tx.date).toLocaleDateString()}</p>

                   {/* SHOW NOTES IF THEY EXIST */}
                   {tx.notes && (
                     <p className="text-sm text-slate-600 italic mt-2 bg-slate-50 p-2 rounded border-l-2 border-indigo-200">
                       "{tx.notes}"
                     </p>
                   )}
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900 mb-2">₹{tx.amount}</p>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => startEdit(tx)} className="text-sm text-indigo-600 font-medium hover:underline">Edit</button>
                    <button onClick={() => handleDelete(tx._id)} className="text-sm text-rose-500 font-medium hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )}

    {/* Pagination controls... */}
    <div className="mt-4 flex gap-2">
        <button
          disabled={page === 1}
          className="px-3 py-1 border"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <p className="text-sm text-gray-500 mb-2">
          Showing page {page} of {pages}
        </p>

        <button
          disabled={page === pages}
          className="px-3 py-1 border"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
    </div>
  </div>
);
}
