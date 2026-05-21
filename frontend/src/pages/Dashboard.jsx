// frontend/src/pages/Dashboard.jsx tu hi 

import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import SummaryCard from '../components/SummaryCard'
import ExpenseCharts from '../components/ExpenseCharts'
import RecentTransactions from '../components/RecentTransactions'
import BudgetTracker from '../components/BudgetTracker'
import AddExpenseModal from '../components/AddExpenseModal'
import { addExpense, getExpenses } from '../services/expenseServices'
import { toast } from 'react-toastify'

function Dashboard() {

    const [openModal, setOpenModal] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [selectedDate, setSelectedDate] = useState(() => {
        const appData = JSON.parse(localStorage.getItem("Expense-Tracker-App"));
        const savedDate = appData?.selectedMonth;
        return savedDate ? new Date(savedDate) : new Date();
    });

    useEffect(() => {
        fetchExpenses();
    }, [])

    const fetchExpenses = async () => {
        try {
            const response = await getExpenses();
            setExpenses(response.data);
            console.log("Dashboard Expenses:---", response.data);
        } catch (error) {
            toast.error(error);
        }
    }

    const handleAddExpense = async (values) => {
        try {
            const response = await addExpense(values);
            await fetchExpenses();
            setOpenModal(false);
            return response.data;

        } catch (error) {
            console.log("Add Expense Error:--", error);
            throw error;
        }
    }

    const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);

        return (
            expenseDate.getMonth() === selectedDate.getMonth() &&
            expenseDate.getFullYear() === selectedDate.getFullYear()
        );
    })

    const totalExpense = filteredExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

    const totalTransactions = filteredExpenses.length;

    const totalCategories = new Set(filteredExpenses.map((expense) => expense.category)).size;

    return (
        <div className='min-h-screen bg-[#edf5ff] p-4 lg:p-7'>
            <Navbar setOpenModal={setOpenModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7'>
                <SummaryCard
                    title="Total Expenses"
                    amount={`₹${totalExpense}`}
                    percent={`${totalTransactions} Transactions`}
                    dark={true}
                />
                <SummaryCard
                    title="Total Transactions"
                    amount={totalTransactions}
                    percent="All Expenses"
                />
                <SummaryCard
                    title="Used Categories"
                    amount={totalCategories}
                    percent="Expense Categories"
                />
                <SummaryCard
                    title="Latest Ebxpense"
                    amount={filteredExpenses.length > 0 ? `₹${filteredExpenses[filteredExpenses.length - 1]?.amount}` : "$0"}
                    percent="Most Recent"
                />
            </div>
            <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7'>
                <ExpenseCharts type="bar" expenses={expenses} />
                <ExpenseCharts type="pie" expenses={filteredExpenses} />
                <ExpenseCharts type="line" expenses={expenses} />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7'>
                <div className='xl:col-span-2'>
                    <RecentTransactions expenses={filteredExpenses} />
                </div>

                <div>
                    <BudgetTracker expenses={filteredExpenses} />
                </div>

            </div>

            {
                openModal &&
                <AddExpenseModal setOpenModal={setOpenModal} handleAddExpense={handleAddExpense} />
            }

        </div>
    )
}

export default Dashboard