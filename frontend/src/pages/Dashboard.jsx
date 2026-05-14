
// frontend/src/pages/Dashboard.jsx
import React from 'react'
import ExpenseModal from '../components/ExpenseModal'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Navbar from '../components/Navbar';
import UsersExpensesCards from '../components/UsersExpensesCards';
import ExpenseCharts from '../components/ExpenseCharts';

function Dashboard() {

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className='min-h-screen bg-[#D9EAFD]'>

        <Navbar />

        {/* MAIN CONTAINER */}
        <div className='px-5 sm:px-10 py-8'>

          {/* TOP CARDS */}
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 w-full'>

            {/* TOTAL BALANCE */}
            <div className='bg-white rounded-2xl shadow-lg p-5 w-full hover:shadow-2xl transition'>

              <h1 className='text-[#154D71] text-lg lg:text-xl font-semibold'>
                Total Balance
              </h1>

              <div className='flex justify-between mt-4'>
                <p>Total amount :</p>
                <p className='text-green-600'>+ 10,000</p>
              </div>

              <div className='flex justify-between mt-2'>
                <p>Total expense :</p>
                <p className='text-red-600'>- 5,000</p>
              </div>

              <hr className='mt-3' />

              <div className='flex justify-between mt-2'>
                <p>Remaining :</p>
                <p className='text-[#154D71] font-semibold'>5,000</p>
              </div>

            </div>

            {/* TOTAL EXPENSES */}
            <div className='bg-white rounded-2xl shadow-lg p-5 w-full hover:shadow-2xl transition'>

              <h1 className='text-[#154D71] text-lg lg:text-xl font-semibold'>
                Total Expenses
              </h1>

              <div className='flex justify-between mt-4'>
                <p>Total Expenses :</p>
                <p className='text-red-600'>- 3,000</p>
              </div>

              <div className='flex justify-between mt-2'>
                <p>Total amount :</p>
                <p className='text-green-600'>+ 7,000</p>
              </div>

              <hr className='mt-3' />

              <div className='flex justify-between mt-2'>
                <p>Balance :</p>
                <p className='text-[#154D71] font-semibold'>10,000</p>
              </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className='bg-white rounded-2xl shadow-lg p-5 pb-6 w-full lg:w-[500px] xl:col-span-1 2xl:col-span-2 self-start hover:shadow-2xl transition'>

              <h1 className='text-[#154D71] text-lg lg:text-xl font-semibold'>
                Quick Actions
              </h1>

              <div className='flex flex-col sm:flex-row xl:flex-col 2xl:flex-row gap-3 mt-4'>

                <button
                  onClick={() => setOpenModal(true)}
                  className='w-full lg:w-[250px] bg-[#154D71] text-white font-semibold px-3 py-3 rounded-xl hover:bg-[#123a56] transition cursor-pointer'
                >
                  Add Expense +
                </button>

                <button
                  onClick={() => navigate('/usersexpensescard')}
                  className='w-full lg:w-[250px] bg-[#154D71] text-white font-semibold px-3 py-3 rounded-xl hover:bg-[#123a56] transition cursor-pointer'
                >
                  View Expenses
                </button>

              </div>

              {openModal && (
                <ExpenseModal setOpenModal={setOpenModal} />
              )}

            </div>

          </div>

          {/* ANALYTICS HEADING */}
          <div className='mt-10 mb-6'>

            <h1 className='text-2xl sm:text-3xl font-bold text-[#154D71]'>
              Expense Analytics Dashboard
            </h1>

            <p className='text-gray-600 mt-2 text-sm sm:text-base'>
              Track your monthly expenses, spending categories, and financial trends with interactive charts.
            </p>

          </div>

          {/* CHARTS */}
          <ExpenseCharts />

        </div>
      </div>
    </>
  )
}

export default Dashboard