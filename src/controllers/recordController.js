const Record = require('../models/Record');

exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;

    // Input validation
    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: 'Amount, type, category and date are required' });
    }

    const record = await Record.create({
      amount, type, category, date, note,
      createdBy: req.user.id
    });

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const filters = { createdBy: req.user.id }; // user isolation

    if (req.query.type) filters.type = req.query.type;
    if (req.query.category) filters.category = req.query.category;
    if (req.query.startDate || req.query.endDate) {
      filters.date = {};
      if (req.query.startDate) filters.date.$gte = new Date(req.query.startDate);
      if (req.query.endDate) filters.date.$lte = new Date(req.query.endDate);
    }

    const records = await Record.find(filters).sort({ date: -1 });
    res.json(records); // ✅ returning records