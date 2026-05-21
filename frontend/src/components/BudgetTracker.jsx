// frontend/src/components/BudgetTracker.jsx

import React from 'react'

function BudgetTracker({ expenses }) {

    const budgetLimits = {
        food: 20000,
        groceries: 15000,
        shopping: 18000,
        trip: 25000,
        stationary: 10000
    }
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
                    <h1 className='text-2xl font-bold text-[#154D71]'>
                        Budget Tracker
                    </h1>

                    <p className='text-gray-500 mt-1'>
                        Monthly budget usage
                    </p>
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

                            const percentage = Math.min(
                                (spent / limit) * 100,
                                100
                            );

                            return (

                                <div key={index}>

                                    <div className='flex justify-between mb-2'>

                                        <p className='font-semibold capitalize'>
                                            {category}
                                        </p>

                                        <p>
                                            ₹{spent} / ₹{limit}
                                        </p>

                                    </div>

                                    <div className='w-full bg-gray-200 h-3 rounded-full overflow-hidden'>

                                        <div
                                            style={{
                                                width: `${percentage}%`
                                            }}
                                            className='bg-[#154D71] h-full rounded-full'
                                        />

                                    </div>

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