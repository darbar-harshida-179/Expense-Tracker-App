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
import useSelectedMonth from '../hooks/useSelectedMonth';
import Loading from './Loading';
import filterExpensesByMonth from '../utils/filterExpensesByMonth';
import SearchBar from './SearchBar';
import Filter from './Filter';
import Sort from './Sort';
import checkBudgetLimit from '../utils/checkBudgetLimits';

function UsersExpensesCards() {

    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { selectedDate, setSelectedDate } = useSelectedMonth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        
        setLoading(true);

        try {
            const response = await getExpenses();
            setExpenses(response.data);
        } 
        catch (error) {
            console.log("Fetch Expenses Error:-", error);
        } 
        finally {
            setLoading(false);
        }
    }

    const handleAddExpense = async (values) => {
        const isAllowed = checkBudgetLimit(expenses, values);

        if (!isAllowed) {
            throw new Error("Budget limit exceeded");
        }

        try {
            const response = await addExpense(values);
            setExpenses((prev) => [...prev, response.data.data]);
            setOpenModal(false);

        } catch (err) {
            setLoading(false);
            if (err.message === "Budget limit exceeded") {
                resetForm();
                setOpenModal(false);
                return;
            }
        }
    }

    const handleUpdateExpense = async (id, values) => {

        const isAllowed = checkBudgetLimit(expenses, values, id);


        if (!isAllowed) {
            throw new Error("Budget limit exceeded");
        }

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

    const monthlyExpenses = filterExpensesByMonth(expenses, selectedDate);
    const filteredExpenses = monthlyExpenses.filter((expense) => {
        const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "" || expense.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    })

    const categories = [...new Set(expenses.map((expense) => expense.category))];

    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        if (sortBy === "latest") {
            return new Date(b.date) - new Date(a.date);
        }
        if (sortBy === "oldest") {
            return new Date(a.date) - new Date(b.date);
        }
        if (sortBy === "highest") {
            return b.amount - a.amount;
        }
        if (sortBy === "lowest") {
            return a.amount - b.amount;
        }
    })

    if (loading) {
        return <Loading />
    }

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
            <div className='min-h-screen bg-[#edf5ff] '>
                <div className='px-4 sm:px-6 pt-6'>
                    <Navbar showBackButton={true} setOpenModal={setOpenModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </div>
                {expenses.length === 0 ? (
                    <div className='flex justify-center items-center min-h-[80vh] px-4'>

                        <div className='rounded-3xl p-10 text-center w-full max-w-md'>

                            <h1 className='text-2xl sm:text-3xl font-bold text-[#154D71]'>
                                No Expenses Found!
                            </h1>

                            <p className='text-gray-500 mt-3'>
                                Add your first expense to start tracking.
                            </p>

                            <button
                                onClick={() => setOpenModal(true)}
                                className='mt-6 bg-[#154D71] hover:bg-[#123a56] text-white font-semibold px-6 py-3 rounded-xl cursor-pointer outline-none transition-all duration-200'
                            >
                                Add Your First Expense
                            </button>

                        </div>

                    </div>
                )
                    :
                    (
                        <div>
                            <div className='px-4 sm:px-6 mt-6'>
                                <div className='flex flex-col lg:flex-row gap-4 overflow-hidden'>

                                    <div className='flex-2'>
                                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                                    </div>

                                    <div className='w-full lg:w-72 min-w-0'>
                                        <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
                                    </div>
                                    <div>
                                        <div className='w-full lg:w-72 min-w-0'>
                                            <Sort sortBy={sortBy} setSortBy={setSortBy} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                filteredExpenses.length === 0 ? (

                                    <div className='flex justify-center items-center min-h-[50vh] px-4'>

                                        <div className='p-10 text-center w-full max-w-md'>

                                            <h1 className='text-2xl font-bold text-[#154D71]'>
                                                No Matching Expenses Found
                                            </h1>

                                            <p className='text-gray-500 mt-3'>
                                                Try changing search or filter options.
                                            </p>

                                        </div>

                                    </div>

                                ) : (

                                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 w-full mt-10 px-6'>

                                        {sortedExpenses.map((expense) => (
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
                                                            }}
                                                            className='w-9 h-10 rounded-xl bg-green-50 hover:bg-green-100 flex justify-center items-center outline-none cursor-pointer'>

                                                            <FaEdit
                                                                size={15}
                                                                className='text-green-600'
                                                            />
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setSelectedExpense(expense);
                                                                setOpenDeleteModal(true);
                                                            }}
                                                            className='w-9 h-10 rounded-xl bg-red-50 hover:bg-red-100 flex justify-center items-center outline-none cursor-pointer'>

                                                            <MdDelete
                                                                size={15}
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

                                                <div className='flex justify-between gap-5 mt-2'>
                                                    <h1>Date: </h1>
                                                    <p>{new Date(expense.date).toLocaleDateString("en-IN")}</p>
                                                </div>
                                            </div>
                                        ))
                                        }

                                    </div>)}
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default UsersExpensesCards