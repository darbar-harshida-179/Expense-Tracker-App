// frontend/src/pages/Dashboard.jsx

import React from 'react'
import ExpenseModal from '../components/ExpenseModal'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Navbar from '../components/Navbar';
import UsersExpensesCards from '../components/UsersExpensesCards';

function Dashboard() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className='min-h-screen bg-[#D9EAFD]'>

        <Navbar/>

        <div className='p-5 sm:p-10'>
          <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4'>
            <div className='flex flex-col lg:flex-row gap-5 w-full'>

              <div className='bg-white rounded shadow-lg p-6 w-full lg:w-[320px]'>
                <h1 className='text-[#154D71] text-xl font-semibold'>Total Balance</h1>

                <div className='flex justify-between mt-4'>
                  <p>Total amount : </p>
                  <p className='text-green-600'>+ 10,000</p>
                </div>
                <div className='flex justify-between mt-2'>
                  <p>Total expense : </p>
                  <p className='text-red-600'>- 5,000</p>
                </div>
                <hr className='mt-3' />
                <div className='flex justify-between mt-2'>
                  <p>Total amount : </p>
                  <p className='text-green-600'>5,000</p>
                </div>

              </div>

              <div className='bg-white rounded shadow-lg p-6 w-full lg:w-[320px]'>
                <h1 className='text-[#154D71] text-xl font-semibold'>Total Expenses</h1>

                <div className='flex justify-between mt-4'>
                  <p>Total Expenses : </p>
                  <p className='text-red-600'>- 3,000</p>
                </div>
                <div className='flex justify-between mt-2'>
                  <p>Total amount : </p>
                  <p className='text-green-600'>+ 7,000</p>
                </div>
                <hr className='mt-3' />
                <div className='flex justify-between mt-2'>
                  <p>Total amount : </p>
                  <p className='text-green-600'>10,000</p>
                </div>

              </div>
            </div>

            <button
            onClick={() => setOpenModal(true)}
              className='bg-[#154D71] text-white font-semibold px-9 py-3 rounded  hover:bg-[#123a56] cursor-pointer outline-none whitespace-nowrap'>
              Add Expense +
            </button>
            { openModal && 
              <ExpenseModal setOpenModal={setOpenModal}/>}
          </div>
          <UsersExpensesCards/>
        </div>
      </div>
    </>
  )
}

export default Dashboard