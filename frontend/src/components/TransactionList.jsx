import React from "react";
import { useEffect, useState } from "react";
import API from "../api/axios";

//import React from "react";

export default function TransactionList({ transactions }) {
  return (
    <div>
      {transactions.map((tx) => (
        <div key={tx._id} className="border p-2 my-2">
          <h3>{tx.title}</h3>
          <p>₹{tx.amount} • {tx.category}</p>
        </div>
      ))}
    </div>
  );
}
