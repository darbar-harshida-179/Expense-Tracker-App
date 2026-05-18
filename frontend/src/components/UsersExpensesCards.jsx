// frontend/src/components/UserExpensesCards.jsx

import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './Navbar';
import AddExpenseModal from './AddExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import DeleteExpenseModal from './DeleteExpenseModal';

function UsersExpensesCards() {

    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

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
        {
            openModal && (
                <AddExpenseModal
                    setOpenModal={setOpenModal}
                />
            )
        }

            {
                openEditModal && (
                    <EditExpenseModal
                        selectedExpense={selectedExpense}
                        setOpenEditModal={setOpenEditModal}
                    />
                )
            }
            {
                openDeleteModal && (
                    <DeleteExpenseModal
                        selectedExpense={selectedExpense}
                        setOpenDeleteModal={setOpenDeleteModal}
                    />
                )
            }
            <div className='min-h-screen bg-[#D9EAFD]'>
                <div className='px-4 sm:px-6 pt-6'>
                    <Navbar showBackButton={true} setOpenModal={setOpenModal}/>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 w-full mt-10 px-6'>


                    {expenses.map((expense, i) => (
                        <div
                            key={expense.id}
                            className='bg-white rounded-2xl shadow-lg p-6 w-full cursor-pointer hover:shadow-2xl '>

                            <div className='flex items-start justify-between'>
                                <h1 className='text-[#154D71] font-bold text-lg lg:text-xl'>Expense: {expense.title}</h1>
                                <div className='flex gap-3 py-1'>
                                    <button
                                        onClick={() => {
                                            setSelectedExpense(expense);
                                            setOpenEditModal(true);
                                        }}
                                        className='w-10 h-10 rounded-xl bg-green-50 hover:bg-green-100 flex justify-center items-center transition cursor-pointer'>

                                        <FaEdit
                                            size={18}
                                            className='text-green-600'
                                        />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedExpense(expense);
                                            setOpenDeleteModal(true);
                                        }}
                                        className='w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 flex justify-center items-center transition cursor-pointer'>

                                        <MdDelete
                                            size={18}
                                            className='text-red-500'
                                        />

                                    </button>
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