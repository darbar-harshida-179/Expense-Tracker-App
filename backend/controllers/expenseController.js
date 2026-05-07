// backend/controllers/expenseController.js

import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {

    try {

        const { title, amount, category } = req.body;

        if (!title || !amount || !category) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newExpense = new Expense({
            ...req.body,
            user: req.userId
        });

        await newExpense.save();

        res.status(201).json({ message: "Expense Added Successfully!" });

    } catch (err) {

        res.status(500).json({ message: "Server Error", error: err.message });

    }
};

export const getExpenses = async (req, res) => {

    try {

        const data = await Expense.find({ user: req.userId });

        res.status(200).json(data);

    } catch (err) {

        res.status(500).json({ message: "Server Error", error: err.message });

    }
};