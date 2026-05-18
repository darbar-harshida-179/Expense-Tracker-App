// frontend/src/components/RecentTransactions.jsx

import React from 'react';
import { FaWallet } from "react-icons/fa6";

function RecentTransactions() {

    const transactions = [
        {
            title: "Big Basket",
            category: "Food & Groceries",
            amount: "-₹2,340",
            time: "Today"
        },
        {
            title: "Amazon",
            category: "Shopping",
            amount: "-₹1,250",
            time: "Yesterday"
        },
        {
            title: "Uber",
            category: "Travel",
            amount: "-₹560",
            time: "2 Days Ago"
        },
        {
            title: "Salary",
            category: "Income",
            amount: "+₹45,000",
            time: "1 May"
        }
    ]

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
                <button className='text-[#154D71] font-semibold cursor-pointer outline-none'>
                    See All
                </button>
            </div>

            <div className='mt-8 space-y-5'>
                {
                    transactions.map((item, index) => (

                        <div
                            key={index}
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
                                <h1 className={`font-bold text-lg ${item.amount.includes('+')
                                    ? "text-green-500"
                                    : "text-red-500"
                                    }`}>
                                    {item.amount}
                                </h1>

                                <p className='text-gray-500 text-sm'>
                                    {item.time}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default RecentTransactions