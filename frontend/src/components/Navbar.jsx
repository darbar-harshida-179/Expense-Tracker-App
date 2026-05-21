// frontend/src/components/Navbar.jsx

import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Calender from './Calender';

function Navbar({ setOpenModal, showBackButton = false, selectedDate = new Date(), setSelectedDate = () => { } }) {

    const [openProfile, setOpenProfile] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const navigate = useNavigate();

    const appData = JSON.parse(localStorage.getItem('Expense-Tracker-App'));
    const user = appData?.user;

    const handleLogout = () => {
        localStorage.removeItem("Expense-Tracker-App");
        navigate('/login');
    }

    return (
        <>
            {
                logoutModal && (
                    <div className='fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50 px-4'>
                        <div className='bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl'>
                            <h1 className='text-2xl font-bold text-center text-[#154D71]'>
                                Logout
                            </h1>

                            <p className='text-center text-gray-500 mt-3'>
                                Are you sure you want to logout?
                            </p>

                            <div className='flex gap-4 mt-8'>
                                <button
                                    onClick={handleLogout}
                                    className='flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold cursor-pointer outline-none'
                                >
                                    Yes
                                </button>

                                <button
                                    onClick={() => setLogoutModal(false)}
                                    className='flex-1 bg-[#154D71] hover:bg-[#123a56] text-white py-3 rounded-xl font-semibold cursor-pointer outline-none'
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                openCalendar && (
                    <div className='fixed inset-0 z-50 flex justify-center items-center px-4'>
                        <div
                            onClick={() => setOpenCalendar(false)}
                            className='absolute inset-0 backdrop-blur-sm'
                        />
                        <div className='relative bg-white rounded-3xl shadow-2xl p-4'>
                            <Calender
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                setOpenCalendar={setOpenCalendar}
                            />
                        </div>
                    </div>
                )
            }
            <div className='bg-white rounded-3xl shadow-sm px-6 py-5 flex items-start justify-between lg:items-center'>
                <div className='flex items-center gap-3'>
                    {
                        showBackButton && (
                            <div
                                onClick={() => navigate('/dashboard')}
                                className='w-11 h-11 rounded-xl bg-[#edf5ff] flex justify-center items-center cursor-pointer hover:bg-[#dbeafe]'>
                                <IoArrowBack
                                    size={22}
                                    className='text-[#154D71]'
                                />
                            </div>
                        )
                    }

                    <div>
                        <h1 className='text-2xl sm:text-3xl font-bold text-[#154D71]'>
                            {
                                showBackButton
                                    ? "Your Expenses"
                                    : "Dashboard"
                            }
                        </h1>

                        <p className='text-gray-500 mt-0'>
                            {
                                showBackButton
                                    ? "Track and manage all expenses"
                                    : "Financial overview dashboard"
                            }
                        </p>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <div className='hidden lg:flex items-center gap-3'>
                        <button
                            onClick={() => setOpenCalendar(true)}
                            className='bg-white border border-gray-200 px-5 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md cursor-pointer outline-none'
                        >
                            {selectedDate.toLocaleString('default', {
                                month: 'long',
                                year: 'numeric'
                            })}
                        </button>

                        <button
                            onClick={() => setOpenModal(true)}
                            className='bg-[#154D71] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#123a56] shadow-lg cursor-pointer outline-none'
                        >
                            + Add Expense
                        </button>

                        <button
                            onClick={() => navigate('/usersexpensescards')}
                            className='bg-[#154D71] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#123a56] shadow-lg cursor-pointer outline-none'
                        >
                            View Expense
                        </button>

                        <div className='relative'>

                            <div
                                onClick={() => setOpenProfile(!openProfile)}
                                className='flex items-center gap-2 bg-[#edf5ff] px-4 py-3 rounded-xl cursor-pointer'>

                                <FaRegUserCircle
                                    size={22}
                                    className='text-[#154D71]'
                                />

                                <p className='font-semibold text-[#154D71]'> {user?.name} </p>

                            </div>

                            {
                                openProfile && (
                                    <>

                                        <div
                                            onClick={() => setOpenProfile(false)}
                                            className='fixed inset-0 z-40'
                                        />

                                        <div className='absolute right-0 top-20 w-32 bg-white rounded-2xl shadow-2xl p-2 z-50'>
                                            <button
                                                onClick={() => {
                                                    setOpenProfile(false);
                                                    setLogoutModal(true);
                                                }}
                                                className='flex items-center gap-2 text-red-500 hover:bg-red-50 w-full p-3 rounded-xl cursor-pointer'
                                            >
                                                <MdOutlineLogout size={20} />
                                                Logout
                                            </button>

                                        </div>

                                    </>
                                )
                            }

                        </div>
                    </div>

                    <div className='relative lg:hidden'>
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className='w-12 h-12 rounded-xl bg-[#154D71] flex justify-center items-center'
                        >
                            <RxHamburgerMenu
                                size={24}
                                className='text-white'
                            />
                        </button>

                        {
                            openMenu && (
                                <>
                                    <div
                                        onClick={() => setOpenMenu(false)}
                                        className='fixed inset-0 z-40'
                                    />

                                    <div className='absolute -right-2 top-28 w-64 bg-white rounded-3xl shadow-2xl p-4 z-50'>
                                        <div className='flex justify-center gap-2 bg-[#edf5ff] px-4 py-3 rounded-xl cursor-pointer'>

                                            <FaRegUserCircle
                                                size={22}
                                                className='text-[#154D71]'
                                            />

                                            <p className='font-semibold text-[#154D71]'>
                                                {user?.name}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setOpenMenu(false);
                                                setOpenCalendar(true);
                                            }}
                                            className='w-full border border-gray-200 py-3 mt-3 rounded-xl font-semibold outline-none'
                                        >
                                            {selectedDate.toLocaleString('default', {
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </button>

                                        <button
                                            onClick={() => {
                                                setOpenMenu(false);
                                                setOpenModal(true);
                                            }}
                                            className='w-full bg-[#154D71] text-white py-3 rounded-xl font-semibold mt-3 outline-none'
                                        >
                                            + Add Expense
                                        </button>

                                        <button
                                            onClick={() => {
                                                setOpenMenu(false);
                                                navigate('/usersexpensescards');
                                            }}
                                            className='w-full bg-[#154D71] text-white py-3 rounded-xl font-semibold mt-3 outline-none'
                                        >
                                            View Expense
                                        </button>

                                        <button
                                            onClick={() => {
                                                setOpenMenu(false);
                                                setLogoutModal(true);
                                            }}
                                            className='w-full flex justify-center items-center gap-2 text-red-500 border border-red-100 py-3 rounded-xl font-semibold mt-3 outline-none'
                                        >
                                            <MdOutlineLogout size={20} />
                                            Logout
                                        </button>

                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar