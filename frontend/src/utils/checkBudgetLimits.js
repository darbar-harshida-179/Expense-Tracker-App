// frontend/src/utils/checkBudgetLimits.js

import { toast } from "react-toastify";
import { budgetLimits } from "../components/Categories";

const checkBudgetLimit = (expenses, values, editingExpenseId = null) => {

    const category = values.category.toLowerCase();

    const limit = budgetLimits[category] || 10000;

    const filteredExpenses = expenses.filter((expense) => {

        if (editingExpenseId) {
            return expense._id !== editingExpenseId;
        }

        return true;
    });

    const currentTotal = filteredExpenses
        .filter(
            (expense) =>
                expense.category.toLowerCase() === category
        )
        .reduce(
            (total, expense) =>
                total + Number(expense.amount),
            0
        );

    const newTotal = currentTotal + Number(values.amount);

    if (newTotal > limit) {

        toast.error(`Budget Limit Exceeded For ${category}!`);

        return false;
    }

    if (newTotal >= limit * 0.8) {

        toast.warning(
            `Warning: Almost Reached ${category} Budget Limit!`
        );
    }

    return true;
};

export default checkBudgetLimit;