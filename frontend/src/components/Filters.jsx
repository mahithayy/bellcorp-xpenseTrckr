import React, { useState } from "react";

export default function Filters({ setFilters }) {
  const [local, setLocal] = useState({
    search: "",
    category: "",
    min: "",
    max: "",
    fromDate: "",
    toDate: "",
  });

  const apply = () => setFilters(local);

  return (
    <div className="border p-4 rounded mb-4 space-y-3">

      {/* Search */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Search expense name"
        onChange={(e) => setLocal({ ...local, search: e.target.value })}
      />

      {/* Category */}
      <input
        className="w-full border p-2 rounded"
        placeholder="Search category"
        onChange={(e) => setLocal({ ...local, category: e.target.value })}
      />

      {/* Amount Range */}
      <div className="grid grid-cols-2 gap-2">
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Min Amount"
          onChange={(e) => setLocal({ ...local, min: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Max Amount"
          onChange={(e) => setLocal({ ...local, max: e.target.value })}
        />
      </div>

      {/* Date Range Section */}
      <div>
        <p className="text-sm text-gray-600 mb-1">
          Select date range (optional)
        </p>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">Start Date</label>
            <input
              className="border p-2 rounded w-full"
              type="date"
              onChange={(e) =>
                setLocal({ ...local, fromDate: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">End Date</label>
            <input
              className="border p-2 rounded w-full"
              type="date"
              onChange={(e) =>
                setLocal({ ...local, toDate: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        onClick={apply}
      >
        Apply Filters
      </button>
    </div>
  );
}
