// frontend/src/components/EditExpenseModal.jsx

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { ImCancelCircle } from "react-icons/im";
import { toast } from 'react-toastify';
import Loading from './Loading';

function EditExpenseModal({
    selectedExpense,
    setOpenEditModal,
    handleUpdateExpense
}) {
    const [loading, setLoading] = useState(false);

    const categoryOptions = [
        { value: 'food', label: 'Food' },
        { value: 'groceries', label: 'Groceries' },
        { value: 'stationary', label: 'Stationary' },
        { value: 'shopping', label: 'Shopping' },
        { value: 'trip', label: 'Trip' }
    ];

    const formik = useFormik({
        initialValues: {
            title: selectedExpense?.title || "",
            amount: selectedExpense?.amount || "",
            category: selectedExpense?.category?.toLowerCase() || ""
        },

        enableReinitialize: true,

        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            amount: Yup.string().required("Amount is required"),
            category: Yup.string().required("Category is required")
        }),

        onSubmit: async (values) => {
            try {
                setLoading(true);
                await handleUpdateExpense(selectedExpense._id, values);
                toast.success("Expense Updated Successfully!");
                setOpenEditModal(false);
            } catch (error) {
                setLoading(false);
                console.log("Update Error:-", error);
            }
        }
    });

    return (
        <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center px-4 z-50'>
            <form
                onSubmit={formik.handleSubmit}
                className='bg-white rounded-3xl shadow-2xl w-full max-w-md p-8'
            >
                <div className='flex justify-end'>
                    <ImCancelCircle
                        size={24}
                        onClick={() => setOpenEditModal(false)}
                        className='cursor-pointer text-[#154D71]'
                    />
                </div>

                <h1 className='text-2xl font-bold text-center text-[#154D71]'>
                    Edit Expense
                </h1>

                <div className='mt-4'>
                    <label className='font-semibold text-[#154D71]'>
                        Title
                    </label>

                    <input
                        type="text"
                        name='title'
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        className='w-full border border-[#154D71] rounded-xl px-4 py-3 mt-1 outline-none'
                    />

                    {
                        formik.errors.title &&
                        <p className='text-red-500 text-sm mt-1'>
                            {formik.errors.title}
                        </p>
                    }
                </div>

                <div className='mt-4'>
                    <label className='font-semibold text-[#154D71]'>
                        Amount
                    </label>

                    <input
                        type="number"
                        name='amount'
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        className='w-full border border-[#154D71] rounded-xl px-4 py-3 mt-1 outline-none'
                    />
                </div>

                <div className='mt-4'>
                    <label className='font-semibold text-[#154D71] block mb-2'>
                        Category
                    </label>

                    <Select
                        options={categoryOptions}
                        value={
                            categoryOptions.find(
                                option => option.value === formik.values.category
                            )
                        }
                        onChange={(selectedOption) => {
                            formik.setFieldValue(
                                'category',
                                selectedOption.value
                            );
                        }}
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-[#154D71] text-white py-3 rounded-xl mt-5 font-semibold cursor-pointer outline-none'
                >
                    {
                        loading
                            ? <Loading text='Updating...' fullScreen={false} />
                            : 'Update Expense'
                    }
                </button>
            </form>
        </div>
    );
}

export default EditExpenseModal;