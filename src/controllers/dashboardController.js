const Record = require('../models/Record');

exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find({ createdBy: req.user.id }).sort({ date: -1 });

    let totalIncome = 0;
    let totalExpense = 0;
    const incomeCategoryTotals = {};
    const expenseCategoryTotals = {};

    const { startDate, endDate } = req.query;

    const filtered = records.filter(r => {
      if (startDate && new Date(r.date) < new Date(startDate)) return false;
      if (endDate && new Date(r.date) > new Date(endDate)) return false;
      return true;
    });

    filtered.forEach(r => {
      if (r.type === 'income') {
        totalIncome += r.amount;
        if (!incomeCategoryTotals[r.category]) incomeCategoryTotals[r.category] = 0;
        incomeCategoryTotals[r.category] += r.amount;
      } else {
        totalExpense += r.amount;
        if (!expenseCategoryTotals[r.category]) expenseCategoryTotals[r.category] = 0;
        expenseCategoryTotals[r.category] += r.amount;
      }
    });

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      incomeCategoryTotals,
      expenseCategoryTotals,
      recentRecords: filtered.slice(0, 5)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};