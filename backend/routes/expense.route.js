const express = require("express")

const expenseController = require("../controllers/expense.controller")

const router = express.Router()
router.get("/",expenseController.getAllExpenses)
router.post("/",expenseController.createExpense)
router.delete("/:id",expenseController.deleteExpense)
router.put("/:id",expenseController.updateExpense)
router.get("/total",expenseController.getTotal)
module.exports = router
