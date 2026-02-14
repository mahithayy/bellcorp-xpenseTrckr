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
    setEditForm({ title: tx.title, amount: tx.amount, category: tx.category });
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction Explorer</h1>

      <Filters setFilters={handleFilters} />

      {/* Empty state */}
      {transactions.length === 0 ? (
        //
        <div className="mt-6 text-center text-gray-500">
    <p>No transactions found.</p>
    <p className="text-sm">Try adjusting filters.</p>
  </div>
      ) : (
        transactions.map((tx) => (
          <div key={tx._id} className="border p-3 my-2 rounded">
            <h3 className="font-semibold">{tx.title}</h3>
            <p>₹{tx.amount} • {tx.category}</p>
            <p className="text-sm text-gray-500">
              {new Date(tx.date).toLocaleDateString()}
            </p>
            {/* CHECK IF EDITING THIS ROW */}
            {editingId === tx._id ? (
              // EDIT MODE
              <div className="flex-1 grid grid-cols-3 gap-2 mr-4">
                <input
                  className="border p-1"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                />
                <input
                  className="border p-1"
                  type="number"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                />
                 <input
                  className="border p-1"
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                />
              </div>
            ) : (
              // VIEW MODE
              <div>
                <h3 className="font-bold">{tx.title}</h3>
                <p className="text-sm text-gray-600">{tx.amount} • {tx.category}</p>
                <p className="text-xs text-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-2">
              {editingId === tx._id ? (
                <>
                  <button onClick={() => saveEdit(tx._id)} className="text-green-600 font-bold border px-2 rounded">Save</button>
                  <button onClick={cancelEdit} className="text-gray-500 border px-2 rounded">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(tx)} className="text-blue-500 hover:text-blue-700">Edit</button>
                  <button onClick={() => handleDelete(tx._id)} className="text-red-500 hover:text-red-700 ml-2">Delete</button>
                </>
              )}
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
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
