const expressAsyncHandler = require("express-async-handler");
const Expense = require("../model/Expense");
const Income = require("../model/Income");

const accountStatsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    //Expenses statistics

    const expenseStats = await Expense.aggregate([
      //filter
      { $match: { amount: { $gte: 0 } } },
      {
        $group: {
          _id: null,
          totalExp: { $sum: "$amount" },
          totalRecordsExp: { $sum: 1 },
        },
      },
    ]);

    //Income statistics

    const incomeStats = await Income.aggregate([
      //filter
      { $match: { amount: { $gte: 0 } } },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
          totalRecordsIncome: { $sum: 1 },
        },
      },
    ]);

    res.json({ expenseStats, incomeStats });
  } catch (error) {
    res.json(error);
  }
});

module.exports = accountStatsCtrl;