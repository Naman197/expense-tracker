const Expense = require('../schema/expenseSchema');



const createExpense = async (req, res) => {
  try {
    const { category, amount, description, date } = req.body;
    const numericAmount = parseFloat(amount);
    const { Sub } = req.userId;
    console.log("here", req.file);
    const userId = Sub;
    if (isNaN(numericAmount)) {
      return res.status(400).json({ error: 'Invalid amount format' });
    }

    const newExpense = new Expense({
      category,
      amount: numericAmount,
      description,
      date,
      user:userId,
    });
    console.log('newexpense',newExpense);

    await newExpense.save();

    res.status(201).json({ message: 'Expense created successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// const getAllexpenses = async (req, res) => {
//     try {
//       // Retrieve expenses for the logged-in user
//       //const expenses = await Expense.find({ user: req.user.id });
//       const expenses = await Expense.find({});
  
//       res.json(expenses);
//     } catch (error) {
//       console.error('Error:', error.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
// const getAllexpenses = async (req, res) => {
//   try {
//     let query = {};
//     const interval = req.query.interval;
//     console.log("interval",interval);
//     const { Sub } = req.userId;
//     const userId = Sub;

//     let categoryTotals = {}; // Declare categoryTotals outside of the if block

//     if (interval === 'weekly') {
//       query = customizeQueryBasedOnWeekly();
//       categoryTotals = await calculateCategoryTotals(query);
//     } 
//     else if (interval === 'monthly') {
//       query = customizeQueryBasedOnMonthly();
//       categoryTotals = await calculateCategoryTotals(query);
//     } 
//     else if (interval === 'daily') {
//       query = customizeQueryBasedOnDaily();
//       categoryTotals = await calculateCategoryTotals(query);
//     }

//     res.json(categoryTotals);
//   } catch (error) {
//     console.error('Error:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const getAllexpenses = async (req, res) => {
  try {
    //console.log("interval", interval);

    let query = {};
    const interval = req.query.interval;
    console.log("interval", interval);
    const { Sub } = req.userId;
    const userId = Sub;
    console.log("userid",userId );
    let categoryTotals = {};

    if (interval === 'weekly') {
      query = customizeQueryBasedOnWeekly();
      categoryTotals = await calculateCategoryTotals(query, userId);
    } else if (interval === 'monthly') {
      query = customizeQueryBasedOnMonthly();
      categoryTotals = await calculateCategoryTotals(query, userId);
    } else if (interval === 'daily') {
      query = customizeQueryBasedOnDaily();
      categoryTotals = await calculateCategoryTotals(query, userId);
    }

    res.json(categoryTotals);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const customizeQueryBasedOnWeekly = () => {
//   return { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
// };
const customizeQueryBasedOnWeekly = () => {
  const lastWeekStartDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return { date: { $gte: lastWeekStartDate } };
};

const customizeQueryBasedOnMonthly = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  console.log("month range ", firstDayOfMonth);
  return { date: { $gte: firstDayOfMonth } };
};



const customizeQueryBasedOnDaily = () => {
  return {};
};

const calculateCategoryTotals = async (query,userId) => {
  // const expenses = await Expense.find(query);
  console.log("category",userId,query);
  const expenses = await Expense.find({ ...query, user:userId });


  const categoryTotals = {};

  expenses.forEach((expense) => {
    const { category, amount } = expense;

    if (!categoryTotals[category]) {
      categoryTotals[category] = amount;
    } else {
      categoryTotals[category] += amount;
    }
  });

  const resultArray = Object.entries(categoryTotals).map(([category, totalAmount]) => ({
    category,
    amount: totalAmount,
  }));

  // Sort the resultArray in descending order based on the amount
  resultArray.sort((a, b) => b.amount - a.amount);

  // Pick the top 8 categories
  const top8Categories = resultArray.slice(0, 8);

  // Calculate the total amount of the remaining categories
  const othersAmount = resultArray.slice(8).reduce((acc, curr) => acc + curr.amount, 0);

  // Create the "Others" category
  const othersCategory = {
    category: 'Others',
    amount: othersAmount,
  };

  // Combine the top 8 categories and the "Others" category
  const finalResultArray = [...top8Categories, othersCategory];
  // finalResultArray.forEach(item)=>{
  //   overall=overall+item.amount
  // }

  console.log(finalResultArray);
  return finalResultArray;
};

module.exports = {
  createExpense,
  getAllexpenses,
};
