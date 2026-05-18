// frontend/src/components/ExpenseModal.jsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ImCancelCircle } from "react-icons/im";
import { BiSolidDownArrow } from "react-icons/bi";
import Select from 'react-select';

function AddExpenseModal({ setOpenModal }) {

    const categoryOptions = [
        { value: 'food', label: 'Food' },
        { value: 'groceries', label: 'Groceries' },
        { value: 'stationary', label: 'Stationary' }
    ];
    const formik = useFormik({
        initialValues: {
            title: "",
            amount: "",
            category: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().trim().required("Title is required"),
            amount: Yup.string().trim().required("Amount is required"),
            category: Yup.string().trim().required("Category is required")
        }),
        onSubmit(values, { resetForm }) {
            try {
                console.log(values);
                toast.success("Expense Added Successfully!");
            } catch (err) {
                console.log("error", err.message);
                toast.error(err.message);
            }
        }
    });

    return (
        <>
            <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center px-3 z-50 overflow-y-auto'>
                <form
                    onSubmit={formik.handleSubmit}
                    className='relative z-50 bg-white shadow-2xl rounded-3xl w-full max-w-md overflow-visible'
                >
                    <div className='p-8'>
                        <div className='flex justify-end'>

                            <ImCancelCircle
                                onClick={() => setOpenModal(false)}
                                size={23} className='text-[#154D71] cursor-pointer' />

                        </div>

                        <h1 className='text-[#154D71] text-2xl text-center font-bold'>Add Expense</h1>
                        <div className='mt-4'>
                            <label className='font-semibold text-[#154D71]'>Title</label>
                            <input
                                type="text"
                                name='title'
                                value={formik.values.title}
                                placeholder='Enter Title'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='w-full px-3 py-2 border border-[#154D71] text-[#154D71] outline-none rounded mt-1'
                            />
                            {formik.touched.title && formik.errors.title &&
                                <p className='text-red-500'>{formik.errors.title}</p>
                            }
                        </div>

                        <div className='mt-2'>
                            <label className='font-semibold text-[#154D71]'>Amount</label>
                            <input
                                type="number"
                                min={0}
                                name='amount'
                                value={formik.values.amount}
                                placeholder='Enter Amount'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                onKeyDown={(e) => {
                                    if (["e", "E", "+", "-", "."].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                className='w-full px-3 py-2 border border-[#154D71] text-[#154D71] outline-none rounded mt-1'
                            />
                            {
                                formik.touched.amount && formik.errors.amount &&
                                <p className='text-red-500'>{formik.errors.amount}</p>
                            }
                        </div>

                        <div className='mt-4'>
                            <label className='font-semibold text-[#154D71] block mb-2'>
                                Category
                            </label>

                            <div className='relative w-full'>
                                <Select
                                    options={categoryOptions}
                                    placeholder="Select Category"
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    value={
                                        categoryOptions.find(
                                            option => option.value === formik.values.category
                                        )
                                    }
                                    onChange={(selectedOption) => {
                                        formik.setFieldValue('category', selectedOption.value);
                                    }}
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderRadius: '12px',
                                            borderColor: '#154D71',
                                            padding: '6px'
                                        }),
                                        menuPortal: (base) => ({
                                            ...base,
                                            zIndex: 9999
                                        })
                                    }}
                                />
                            </div>

                            {
                                formik.touched.category && formik.errors.category && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {formik.errors.category}
                                    </p>
                                )
                            }
                        </div>

                        <button
                            type='submit'
                            className='w-full px-3 py-2 bg-[#154D71] text-white font-semibold rounded cursor-pointer outline-none mt-3 hover:bg-[#123a56]'>
                            Add Expense</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddExpenseModal