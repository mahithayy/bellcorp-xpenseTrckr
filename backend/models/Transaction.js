const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  amount: Number,
  category: String,
  date: Date,
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
