const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const mongoose = require('mongoose');
const expense = require('./routes/expense');
const tip=require('./routes/tip');
const user=require('./routes/user');
mongoose
  .connect('mongodb://127.0.0.1:27017/Expense', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection successful');
  })
  .catch((e) => {
    console.log('Connection error', e);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/expense', expense);
app.use('/user', user);
app.use('/tip',tip)

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
