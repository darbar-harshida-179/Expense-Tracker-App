// frontend/src/components/UserExpensesCards.jsx

import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './Navbar';

function UsersExpensesCards() {

    const expenses = [
        {
            id: 1,
            title: "Dinner",
            amount: 500,
            category: "Food"
        },
        {
            id: 2,
            title: "Lunch",
            amount: "350",
            category: "Food"
        },
        {
            id: 3,
            title: "Breakfast",
            amount: 250,
            category: "Fruits"
        },
        {
            id: 4,
            title: "Groceries",
            amount: 1000,
            category: "Groceries"
        },
        {
            id: 5,
            title: "Groceries",
            amount: 1000,
            category: "Groceries"
        },
        {
            id: 6,
            title: "Groceries",
            amount: 1000,
            category: "Groceries"
        }
    ]
    return (
        <>
            <div className='min-h-screen bg-[#D9EAFD]'>
                   <Navbar showBackButton={true} />
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 w-full mt-10 px-6'>

                    {expenses.map((expense, i) => (
                        <div
                            key={expense.id}
                            className='bg-white rounded-2xl shadow-lg p-6 w-full cursor-pointer hover:shadow-2xl '>

                            <div className='flex items-start justify-between'>
                                <h1 className='text-[#154D71] font-bold text-lg lg:text-xl'>Expense: {expense.title}</h1>
                                <div className='flex gap-1 py-1'>
                                    <FaEdit size={20} className='text-green-600 cursor-pointer' />
                                    <MdDelete size={21} className='text-red-600 cursor-pointer' />
                                </div>
                            </div>

                            <hr className='mt-2' />
                            <div className='flex justify-between gap-5 mt-5'>
                                <h1>Title: </h1>
                                <p>{expense.title}</p>
                            </div>

                            <div className='flex justify-between gap-5 mt-2'>
                                <h1>Amount: </h1>
                                <p>{expense.amount}</p>
                            </div>

                            <div className='flex justify-between gap-5 mt-2'>
                                <h1>Category: </h1>
                                <p>{expense.category}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default UsersExpensesCards