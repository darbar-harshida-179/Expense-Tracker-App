// frontend/src/pages/signup.jsx

import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { PiEyeSlashFill } from "react-icons/pi";
import { registerUser } from '../services/authServices';

function SignUp() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Name is required"),
      email: Yup.string().trim().required("Emaiil is required").email("enter valid email"),
      password: Yup.string().trim().required("Password is required").min(6, 'atleast 6 character is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await registerUser(values);
        resetForm();
        toast.success("Registration Successfull, Please Login!");
        navigate('/login');
      } catch (err) {
        toast.error(err.response?.data?.message || "Registration Failed...");
        toast.error(err.message);
      }
    }
  })
  return (
    <>
      <div className='min-h-screen bg-[#D9EAFD] flex justify-center items-center px-3'>
        <div className='bg-[#F2F9FF] w-full max-w-md p-8 rounded shadow-xl'>
          <form onSubmit={formik.handleSubmit}>

            <h1 className='font-bold text-2xl sm:text-3xl text-[#154D71] text-center'>Create Account</h1>

            <div className='mt-5'>
              <label className='text-[#154D71] font-semibold'>Name</label>
              <input
                type="name"
                name='name'
                placeholder='Enter Your Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='w-full h-10 border border-[#154D71] p-3 mt-1 rounded outline-none'
              />
              {formik.touched.name && formik.errors.name && (
                <p className='text-red-500'>{formik.errors.name}</p>
              )}
            </div>

            <div className='mt-5'>
              <label className='text-[#154D71] font-semibold'>Email</label>
              <input
                type="email"
                name='email'
                placeholder='Enter Your Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='w-full h-10 border border-[#154D71] p-3 mt-1 rounded outline-none'
              />
              {formik.touched.email && formik.errors.email && (
                <p className='text-red-500'>{formik.errors.email}</p>
              )}
            </div>

            <div className='relative mt-5'>
              <label className='text-[#154D71] font-semibold'>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                placeholder='Enter Your Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='relative w-full h-10 border border-[#154D71] p-3 mt-1 rounded outline-none'
              />
              <div
                onClick={() => { setShowPassword(!showPassword) }}
                className='absolute top-9 right-3  cursor-pointer text-[#154D71]'>
                {showPassword ? <IoEyeSharp size={23} /> : <PiEyeSlashFill size={23} />}
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className='text-red-500'>{formik.errors.password}</p>
              )}
            </div>

            <button
              type='submit'
              className='w-full h-10 mt-6 bg-[#154D71] text-white font-semibold rounded outline-none cursor-pointer  hover:bg-[#123a56]'>Sign Up
            </button>

            <p className='font-semibold text-gray-700 mt-3 text-center'>Already have an account?
              <span
                onClick={() => navigate('/login')}
                className='text-[#154D71] cursor-pointer'>Login
              </span>
            </p>
            
          </form>
        </div>
      </div>
    </>
  )
}
export default SignUp
