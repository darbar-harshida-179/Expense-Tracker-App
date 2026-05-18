// frontend/src/components/SummaryCard.jsx

import React from 'react'

function SummaryCard({ title, amount, percent, dark }) {

    return (
        <div className={`rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300 ${dark
                ? "bg-gradient-to-r from-[#154D71] to-[#2f7eb6] text-white"
                : "bg-white"
            }`}>

            <p className={`text-sm uppercase tracking-[3px] ${dark ? "text-gray-200" : "text-gray-400"
                }`}>
                {title}
            </p>

            <h1 className='text-4xl font-bold mt-5'>
                {amount}
            </h1>

            <div className='mt-5'>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${dark
                        ? "bg-white/20 text-white"
                        : "bg-[#edf5ff] text-[#154D71]"
                    }`}>
                    {percent}
                </span>
            </div>

        </div>
    )
}

export default SummaryCard