// frontend/src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import SummaryCard from '../components/SummaryCard'
import ExpenseCharts from '../components/ExpenseCharts'
import RecentTransactions from '../components/RecentTransactions'
import BudgetTracker from '../components/BudgetTracker'
import AddExpenseModal from '../components/AddExpenseModal'
import { addExpense, getExpenses } from '../services/expenseServices'
import { toast } from 'react-toastify'
import useSelectedMonth from '../hooks/useSelectedMonth'
import { formatCurrency } from '../utils/formatCurrency'
import Loading from '../components/Loading'
import filterExpensesByMonth from '../utils/filterExpensesByMonth'
import checkBudgetLimit from '../utils/checkBudgetLimits'

function Dashboard() {

    const [openModal, setOpenModal] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { selectedDate, setSelectedDate } = useSelectedMonth();

    useEffect(() => {
        fetchExpenses();
    }, [])

    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const response = await getExpenses();
            setExpenses(response.data);
            console.log("Dashboard Expenses:---", response.data);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleAddExpense = async (values) => {

        const isAllowed = checkBudgetLimit(expenses, values);

        // if(!isAllowed) return;

    if (!isAllowed) {
        throw new Error("Budget limit exceeded");
    }

        setLoading(true);

        try {
            const response = await addExpense(values);
            await fetchExpenses();
            setOpenModal(false);
            return response.data;

        } catch (error) {
            console.log("Add Expense Error:--", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }
    const filteredExpenses = filterExpensesByMonth(expenses, selectedDate);

    const totalExpense = filteredExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

    const totalTransactions = filteredExpenses.length;

    const totalCategories = new Set(filteredExpenses.map((expense) => expense.category)).size;

    if (loading) {
        return <Loading />
    }

    return (
        <div className='min-h-screen bg-[#edf5ff] p-4 lg:p-7'>
            <Navbar setOpenModal={setOpenModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />


            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7'>
                <SummaryCard
                    title="Total Expenses"
                    amount={formatCurrency(totalExpense)}
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
                    title="Latest Expense"
                    amount={filteredExpenses.length > 0 ? formatCurrency(filteredExpenses[filteredExpenses.length - 1]?.amount) : formatCurrency(0)}
                    percent="Most Recent"
                />
            </div>
            <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7'>
                <ExpenseCharts type="bar" expenses={expenses} />
                <ExpenseCharts type="pie" expenses={expenses} />
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