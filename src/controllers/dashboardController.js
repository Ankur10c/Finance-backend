const Record = require('../models/Record');

exports.getSummary = async (req, res) => {
  try {
    // User isolation - only fetch current user's records
    const records = await Record.find({ createdBy: req.user.id }).sort({ date: -1 });

    let totalIncome = 0;
    let totalExpense = 0;
    const incomeCategoryTotals = {};
    const expenseCategoryTotals = {};

    // Date filtering
    const { startDate, endDate } = req.query;

    const filtered = records.filter(r => {
      if (startDate && new Date(r.date) < new Date(startDate)) return false;
      if (endDat
        