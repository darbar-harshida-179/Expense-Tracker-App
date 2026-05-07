
import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
    const newExpense = new Expense({
        ...req.body,
        user: req.userId
    });
    await newExpense.save();
    res.send("Expense Added Successfully!");
}

export const getExpenses = async (req, res) => {
    const data = await Expense.find({ user: req.userId });
    res.json(data);

}