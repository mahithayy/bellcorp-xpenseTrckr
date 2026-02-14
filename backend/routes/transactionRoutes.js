const express = require("express");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const tx = await Transaction.create({
    ...req.body,
    amount: Number(req.body.amount),  //  force number
    user: req.user,
  });
  res.json(tx);
});


router.get("/", auth, async (req, res) => {
  const { search, category, min, max, fromDate, toDate, page = 1, limit = 5 } = req.query;

  const query = { user: req.user };

  //if (search) query.title = { $regex: search, $options: "i" };
  if (search) {
  query.$or = [
    { title: { $regex: search, $options: "i" } },
    { category: { $regex: search, $options: "i" } },
    { notes: { $regex: search, $options: "i" } },
  ];
}

  if (category) query.category = { $regex: category, $options: "i" };
  if (min || max) query.amount = { $gte: min || 0, $lte: max || Infinity };

  if (fromDate || toDate) {
    query.date = {};
    if (fromDate) query.date.$gte = new Date(fromDate);
    if (toDate) query.date.$lte = new Date(toDate);
  }

  const skip = (page - 1) * limit;

  const txs = await Transaction.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Transaction.countDocuments(query);

  res.json({
    data: txs,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
});


router.put("/:id", auth, async (req, res) => {
  const tx = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tx);
});

router.delete("/:id", auth, async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
