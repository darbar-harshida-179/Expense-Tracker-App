// frontend/src/components/Navbar.jsx

import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";

function Navbar() {
    return (
        <>
            <div className='bg-[#154D71] flex justify-between px-4 py-4'>
                <h1 className='text-white text-2xl sm:text-3xl font-semibold sm:px-7 py-2'>Expense Tracker App</h1>
                <div className='flex px-3 py-1 border border-white rounded cursor-pointer outline-none'>
                    <FaRegUserCircle size={24} className='text-white mt-2' />
                    <p className='text-white px-2 py-2'>Harshida</p>
                </div>
            </div>
        </>
    )
}

export default Navbar