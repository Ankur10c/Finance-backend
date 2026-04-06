const express = require('express');
const app = express();

app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/records', require('./routes/recordRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));

app.get('/', (req, res) => {
  res.send('API is running');
});

module.exports = app;