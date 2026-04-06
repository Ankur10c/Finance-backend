const Record = require('../models/Record');

exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;
    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: 'Amount, type, category and date are required' });
    }
    const record = await Record.create({ amount, type, category, date, note, createdBy: req.user.id });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const filters = { createdBy: req.user.id };
    if (req.query.type) filters.type = req.query.type;
    if (req.query.category) filters.category = req.query.category;
    const records = await Record.find(filters).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    const updated = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};