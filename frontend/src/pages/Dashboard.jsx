// frontend/src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import SummaryCard from '../components/SummaryCard'
import ExpenseCharts from '../components/ExpenseCharts'
import RecentTransactions from '../components/RecentTransactions'
import BudgetTracker from '../components/BudgetTracker'
import AddExpenseModal from '../components/AddExpenseModal'
import { addExpense } from '../services/expenseServices'

function Dashboard() {

    const [openModal, setOpenModal] = useState(false);


    const handleAddExpense = async (values) => {
        try {
            const response = await addExpense(values);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Add Expense Error:--", error);
            throw error;
        }
    }

    return (
        <div className='min-h-screen bg-[#edf5ff] p-4 lg:p-7'>
            <Navbar setOpenModal={setOpenModal} />

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-7'>
                <SummaryCard
                    title="Net Balance"
                    amount="₹46,180"
                    percent="+14.6%"
                    dark={true}
                />
                <SummaryCard
                    title="Total Income"
                    amount="₹1,24,500"
                    percent="+8.2%"
                />
                <SummaryCard
                    title="Total Expenses"
                    amount="₹78,320"
                    percent="-4.1%"
                />
                <SummaryCard
                    title="Budget Used"
                    amount="62.8%"
                    percent="-5.3%"
                />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7'>
                <ExpenseCharts type="bar" />
                <ExpenseCharts type="pie" />
                <ExpenseCharts type="line" />
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 mt-7'>
                <div className='xl:col-span-2'>
                    <RecentTransactions />
                </div>

                <div>
                    <BudgetTracker />
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