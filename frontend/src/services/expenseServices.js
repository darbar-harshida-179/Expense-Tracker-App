// frontend/src/services/expenseServices.js

import API from "../utils/api";

export const addExpense = async (expenseData) => {
    return await API.post('/add-expense', expenseData);
}

export const getExpenses = async () => {
    return await API.get('/expenses');
}

export const updateExpense = async (id, updatedData) => {
    return await API.put(`/update-expense/${id}`, updatedData);
}

export const deleteExpense = async (id) => {
    return await API.delete(`/delete-expense/${id}`);
}