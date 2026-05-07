// backend/routes/expenseRoutes.js

import express from 'express';

import { addExpense, deleteExpense, getExpenses, updateExpense } from "../controllers/expenseController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/add-expense', authMiddleware, addExpense);

router.get('/expenses', authMiddleware, getExpenses);

router.put('/update-expense/:id', authMiddleware, updateExpense);

router.delete('/delete-expense/:id', authMiddleware, deleteExpense);

export default router;