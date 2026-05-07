// backend/routes/expenseRoutes.js

import express from 'express';

import { addExpense, getExpenses } from "../controllers/expenseController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/add-expense', authMiddleware, addExpense);

router.get('/expenses', authMiddleware, getExpenses);

export default router;