// frontend/src/components/BudgetTracker.jsx

import React from 'react'
import { formatCurrency } from '../utils/formatCurrency';
import { budgetLimits } from './Categories';

function BudgetTracker({ expenses }) {

    const categoryTotals = {};

    expenses.forEach((expense) => {
        const category = expense.category.toLowerCase();

        if (categoryTotals[category]) {
            categoryTotals[category] += Number(expense.amount);
        } else {
            categoryTotals[category] = Number(expense.amount);
        }
    });

    const hasExpenses = Object.keys(categoryTotals).length > 0;

    return (
        <div className='bg-white rounded-3xl shadow-sm p-6 h-full'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold text-[#154D71]'> Budget Tracker </h1>

                    <p className='text-gray-500 mt-1'> Monthly budget usage </p>
                </div>
            </div>

            <div className='mt-10 space-y-8'>
                {
                    !hasExpenses ? (
                        <div className='flex justify-center items-center h-40'>
                            <p className='text-gray-600 text-lg font-semibold'>
                                No budget used this month
                            </p>
                        </div>
                    ) : (

                        Object.keys(categoryTotals).map((category, index) => {

                            const spent = categoryTotals[category];

                            const limit = budgetLimits[category] || 10000;

                            const percentage = Math.min((spent / limit) * 100, 100);

                            return (

                                <div key={index}>

                                    <div className='flex justify-between mb-2'>

                                        <p className='font-semibold capitalize'>{category}</p>

                                        <p>{formatCurrency(spent)} / {formatCurrency(limit)}</p>

                                    </div>

                                    <div className='w-full bg-gray-200 h-3 rounded-full overflow-hidden'>

                                        <div style={{ width: `${percentage}%` }} className={`h-full rounded-full duration-300
                                            ${spent >= limit
                                                ? 'bg-red-500'
                                                : spent >= limit * 0.8
                                                    ? 'bg-yellow-400'
                                                    : 'bg-[#154D71]'
                                            }
                                            `} />

                                    </div>
                                    {
                                        spent >= limit && (
                                            <p className='text-red-500 text-sm font-semibold mt-2'>
                                                Budget Limit Exceeded For {category}
                                            </p>
                                        )
                                    }
                                    {
                                        spent >= limit * 0.8 && spent < limit && (
                                            <p className='text-yellow-600 text-sm font-medium mt-2'>
                                                Almost Reached Your Budget Limit!
                                            </p>
                                        )
                                    }
                                </div>
                            );
                        })
                    )
                }
            </div>
        </div>
    )
}
export default BudgetTracker