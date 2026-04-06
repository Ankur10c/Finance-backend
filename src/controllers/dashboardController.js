const Record = require('../models/Record');

exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find();
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals = {};

    records.forEach(r => {
      if (r.type === 'income') totalIncome += r.amount;
      else totalExpense += r.amount;
      if (!categoryTotals[r.category]) categoryTotals[r.category] = 0;
      categoryTotals[r.category] += r.amount;
    });

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categoryTotals,
      recentRecords: records.slice(-5)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};