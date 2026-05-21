// frontend/src/components/UserExpensesCards.jsx

import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './Navbar';
import AddExpenseModal from './AddExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import DeleteExpenseModal from './DeleteExpenseModal';
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../services/expenseServices';
import { toast } from 'react-toastify';

function UsersExpensesCards() {

    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [editExpense, setEditExpense] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await getExpenses();
            setExpenses(response.data);
        } catch (error) {
            console.log("Fetch Expenses Error:-", error);
        }
    }

    const handleAddExpense = async (values) => {
        try {
            const response = await addExpense(values);
            setExpenses((prev) => [...prev, response.data.data]);
            setOpenModal(false);

        } catch (error) {
            console.log("Add Expense Error:-", error);
            throw error;
        }
    }

    const handleUpdateExpense = async (id, values) => {
        try {
            const response = await updateExpense(id, values);
            setExpenses((prev) =>
                prev.map((expense) =>
                    expense._id === id ? response.data.data : expense)
            );
        } catch (error) {
            console.log("Update Error:--", error);
            throw error;
        }
    }


    const handleDeleteExpense = async (id) => {
        try {
            await deleteExpense(id);
            setExpenses((prev) => prev.filter((expense) => expense._id !== id));
            toast.success("Expense Deleted Successfully!");
            setOpenDeleteModal(false);
        } catch (error) {
            console.log("Delete Error:-", error);
            throw error;
        }
    }

    const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.createdAt);
        return (
            expenseDate.getMonth() === selectedDate.getMonth() &&
            expenseDate.getFullYear() === selectedDate.getFullYear()
        )
    });
    return (
        <>
            {
                openModal && (
                    <AddExpenseModal
                        setOpenModal={setOpenModal}
                        handleAddExpense={handleAddExpense}
                    />
                )
            }

            {
                openEditModal && (
                    <EditExpenseModal
                        handleUpdateExpense={handleUpdateExpense}
                        editExpense={editExpense}
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
                        handleDeleteExpense={handleDeleteExpense}
                    />
                )
            }
            <div className='min-h-screen bg-[#D9EAFD]'>
                <div className='px-4 sm:px-6 pt-6'>
                    <Navbar showBackButton={true} setOpenModal={setOpenModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                </div>
                {filteredExpenses.length === 0 ? (
                    <p className='min-h-screen w-full flex justify-center items-center text-xl font-semibold text-gray-500'>No Expenses Found! </p>
                )
                    : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 w-full mt-10 px-6'>

                            {filteredExpenses.map((expense) => (
                                <div
                                    key={expense._id}
                                    className='bg-white rounded-2xl shadow-lg p-6 w-full cursor-pointer hover:shadow-2xl '>

                                    <div className='flex items-start justify-between'>
                                        <h1 className='text-[#154D71] font-bold text-lg lg:text-xl'>Expense: {expense.title}</h1>
                                        <div className='flex gap-3 py-1'>
                                            <button
                                                onClick={() => {
                                                    setSelectedExpense(expense);
                                                    setOpenEditModal(true);
                                                    setEditExpense(expense);
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
                    )
                }

            </div>
        </>
    )
}

export default UsersExpensesCards