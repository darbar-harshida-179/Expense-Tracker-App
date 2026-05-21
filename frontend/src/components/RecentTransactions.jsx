// frontend/src/components/RecentTransactions.jsx

import React from 'react';
import { FaWallet } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function RecentTransactions({ expenses }) {

    const navigate = useNavigate();

    return (
        <div className='bg-white rounded-3xl shadow-sm p-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold text-[#154D71]'>
                        Recent Transactions
                    </h1>
                    <p className='text-gray-500 mt-1'>
                        Latest financial activities
                    </p>
                </div>
                <button
                    onClick={() => navigate('/usersexpensescards')}
                    className='text-[#154D71] font-semibold cursor-pointer outline-none'>
                    See All
                </button>
            </div>

            <div className='mt-8 space-y-5'>
                {expenses.length === 0 ? (
                    <div className='flex justify-center items-center h-40'>
                        <p className='text-gray-600 text-lg font-semibold'>
                            No Recent Transaction
                        </p>
                    </div>
                ) : (

                    expenses.slice().reverse().slice(0, 5).map((item) => (
                        <div
                            key={item._id}
                            className='flex justify-between items-center border-b border-gray-100 pb-4'
                        >
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 rounded-2xl bg-[#edf5ff] flex justify-center items-center text-xl'>
                                    <FaWallet size={25} className='text-yellow-400 cursor-pointer' />
                                </div>

                                <div>
                                    <h1 className='font-semibold text-lg'>
                                        {item.title}
                                    </h1>

                                    <p className='text-gray-500 text-sm'>
                                        {item.category}
                                    </p>
                                </div>
                            </div>

                            <div className='text-right'>
                                <h1 className='font-bold text-lg text-red-500'>
                                    ₹ {item.amount}
                                </h1>
                                <p className='text-gray-500 text-sm'>
                                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
                                </p>
                            </div>
                        </div>
                    ))

                )
                }

            </div>
        </div>
    )
}
export default RecentTransactions