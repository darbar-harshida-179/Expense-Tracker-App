// frontend/src/components/Navbar.jsx

import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Navbar({ showBackButton = false }) {

    const navigate = useNavigate();

    const [openMenu, setOpenMenu] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);

    return (
        <>

            {(openMenu || logoutModal) && (
                <div
                    onClick={() => {
                        setOpenMenu(false);
                        setLogoutModal(false);
                    }}
                    className='fixed inset-0 backdrop-blur-sm z-40'
                />
            )}

            <div className='bg-[#154D71] px-4 sm:px-6 py-4 relative z-50'>

                <div className='flex justify-between items-center'>

                    <div className='flex items-center gap-3'>
                        {showBackButton && (
                            <IoArrowBackSharp
                                size={26}
                                onClick={() => navigate('/dashboard')}
                                className='text-white cursor-pointer hover:scale-110'
                            />
                        )}

                        <h1 className='text-white text-xl sm:text-2xl lg:text-3xl font-semibold'>
                            Expense Tracker App
                        </h1>

                    </div>

                    {/* DESKTOP MENU */}
                    <div className='relative hidden md:block'>

                        <div
                            onClick={() => setOpenMenu(!openMenu)}
                            className='flex items-center gap-2 px-4 py-2 border border-white hover:bg-[#123a56] transition rounded-lg cursor-pointer outline-none'
                        >
                            <FaRegUserCircle
                                size={22}
                                className='text-white'
                            />

                            <p className='text-white font-medium'>
                                Harshida
                            </p>
                        </div>

                        {
                            openMenu && (
                                <div className='absolute right-0 top-16 bg-white shadow-2xl rounded-xl w-48 p-4 z-50'>

                                    <div className='flex items-center gap-2 hover:bg-blue-50 rounded-lg p-2 cursor-pointer outline-none'>

                                        <FaRegUserCircle
                                            size={22}
                                            className='text-[#154D71]'
                                        />

                                        <p className='text-[#154D71] font-medium'>
                                            Harshida
                                        </p>

                                    </div>

                                    <button
                                        onClick={() => {
                                            setLogoutModal(true);
                                            setOpenMenu(false);
                                        }}
                                        className='flex items-center gap-2 mt-1 text-red-500 hover:bg-red-50 w-full rounded-lg p-2 cursor-pointer outline-none'
                                    >
                                        <MdOutlineLogout size={22} />
                                        Logout
                                    </button>

                                </div>
                            )
                        }
                    </div>

                    {/* MOBILE MENU */}
                    <div className='relative md:hidden'>

                        <GiHamburgerMenu
                            size={26}
                            onClick={() => setOpenMenu(!openMenu)}
                            className='text-white cursor-pointer'
                        />

                        {
                            openMenu && (
                                <div className='absolute right-0 top-12 bg-white shadow-2xl rounded-xl w-56 p-4 z-50'>

                                    <div className='flex items-center gap-2 hover:bg-blue-50 rounded-lg p-2 cursor-pointer outline-none'>

                                        <FaRegUserCircle
                                            size={22}
                                            className='text-[#154D71]'
                                        />

                                        <p className='text-[#154D71] font-medium'>
                                            Harshida
                                        </p>

                                    </div>

                                    <button
                                        onClick={() => {
                                            setLogoutModal(true);
                                            setOpenMenu(false);
                                        }}
                                        className='flex items-center gap-2 mt-3 text-red-500 hover:bg-red-50 w-full rounded-lg p-2 cursor-pointer outline-none'
                                    >
                                        <MdOutlineLogout size={22} />
                                        Logout
                                    </button>

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {
                logoutModal && (
                    <div className='fixed inset-0 flex justify-center items-center z-50 px-4'>

                        <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md p-6'>

                            <p className='text-[#154D71] font-bold text-xl text-center mt-3'>
                                Are you sure you want to logout?
                            </p>

                            <div className='flex gap-4 mt-6'>

                                <button
                                    className='w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg cursor-pointer outline-none'
                                >
                                    Yes
                                </button>

                                <button
                                    onClick={() => setLogoutModal(false)}
                                    className='w-full py-3 bg-[#154D71] hover:bg-[#123a56] text-white font-semibold rounded-lg cursor-pointer outline-none'
                                >
                                    No
                                </button>

                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Navbar