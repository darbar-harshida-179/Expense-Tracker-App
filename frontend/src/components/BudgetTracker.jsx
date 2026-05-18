// frontend/src/components/BudgetTracker.jsx

import React from 'react'

function BudgetTracker() {

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
                <p className='text-[#154D71] font-semibold'>
                    86%
                </p>
            </div>

            <div className='mt-10'>
                <div className='mb-8'>
                    <div className='flex justify-between mb-2'>
                        <p className='font-semibold'>Food & Dining</p>
                        <p>₹17k / ₹20k</p>
                    </div>

                    <div className='w-full bg-gray-200 h-3 rounded-full'>
                        <div className='bg-[#154D71] h-full w-[86%] rounded-full' />
                    </div>
                </div>

                <div className='mb-8'>
                    <div className='flex justify-between mb-2'>
                        <p className='font-semibold'>Shopping</p>
                        <p>₹12k / ₹18k</p>
                    </div>

                    <div className='w-full bg-gray-200 h-3 rounded-full overflow-hidden'>
                        <div className='bg-blue-500 h-full w-[60%] rounded-full' />
                    </div>
                </div>
                <div>

                    <div className='flex justify-between mb-2'>
                        <p className='font-semibold'>Travel</p>
                        <p>₹8k / ₹15k</p>
                    </div>

                    <div className='w-full bg-gray-200 h-3 rounded-full overflow-hidden'>
                        <div className='bg-cyan-500 h-full w-[43%] rounded-full' />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BudgetTracker