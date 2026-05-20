// frontend/src/components/DeleteExpenseModal.jsx

import React from 'react';

function DeleteExpenseModal({
    selectedExpense,
    setOpenDeleteModal,
    handleDeleteExpense
}) {

    return (
        <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center px-4 z-50'>

            <div className='bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md'>

                <h1 className='text-2xl font-bold text-center text-[#154D71]'>
                    Delete Expense
                </h1>

                <p className='text-center text-gray-500 mt-4'>
                    Are you sure you want to delete
                    <span className='font-semibold text-[#154D71]'>
                        {" "} {selectedExpense?.title}
                    </span>
                    
                </p>

                <div className='flex gap-4 mt-8'>

                    <button
                        onClick={() => handleDeleteExpense(selectedExpense._id)}
                        className='flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold cursor-pointer outline-none'
                    >
                        Yes
                    </button>

                    <button
                        onClick={() => setOpenDeleteModal(false)}
                        className='flex-1 bg-[#154D71] hover:bg-[#123a56] text-white py-3 rounded-xl font-semibold cursor-pointer outline-none'
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteExpenseModal;