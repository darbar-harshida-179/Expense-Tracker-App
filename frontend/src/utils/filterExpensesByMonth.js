// frontend/src/utils/filterExpensesByMonth.js

const filterExpensesByMonth = (expenses, selectedDate) => {

    return expenses.filter((expense) => {

        const expenseDate = new Date(expense.date);

        return (
            expenseDate.getMonth() === selectedDate.getMonth() &&
            expenseDate.getFullYear() === selectedDate.getFullYear()
        );
    });
};

export default filterExpensesByMonth;