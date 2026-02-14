import React,{ useState } from "react";

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
    <div className="border p-4 rounded mb-4 grid grid-cols-2 gap-2">
      <input placeholder="Search"
        onChange={(e) => setLocal({ ...local, search: e.target.value })} />

      <input placeholder="Category"
        onChange={(e) => setLocal({ ...local, category: e.target.value })} />

      <input type="number" placeholder="Min Amount"
        onChange={(e) => setLocal({ ...local, min: e.target.value })} />

      <input type="number" placeholder="Max Amount"
        onChange={(e) => setLocal({ ...local, max: e.target.value })} />

      <input type="date"
        onChange={(e) => setLocal({ ...local, fromDate: e.target.value })} />

      <input type="date"
        onChange={(e) => setLocal({ ...local, toDate: e.target.value })} />

      <button
        className="col-span-2 bg-black text-white py-2"
        onClick={apply}
      >
        Apply Filters
      </button>
    </div>
  );
}
