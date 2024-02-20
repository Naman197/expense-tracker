const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense'); 
const Expense = require('../schema/expenseSchema');
const fetchUser = require('../middlewares/fetchuser'); 
router.post('/create', fetchUser,expenseController.createExpense);
router.get('/total', fetchUser,expenseController.getAllexpenses);

// router.get('/:id', expenseController.getExpenseById);
// router.put('/:id', expenseController.updateExpense);
// router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
