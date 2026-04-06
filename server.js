require('dotenv').config();
const app = require('./src/app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.log(err));
  console.log("ENV CHECK:", process.env.MONGO_URI);
  console.log("Server file running");