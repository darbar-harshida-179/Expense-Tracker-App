// frontend/src/pages/Login.jsx

import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { IoEyeSharp } from "react-icons/io5";
import { PiEyeSlashFill } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authServices';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Emaiil is required").email("enter valid email"),
      password: Yup.string().trim().required("Password is required").min(6, 'atleast 6 character is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await loginUser(values);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        resetForm();
        toast.success("Login Successfull!");
        navigate('/dashboard')
      } catch (err) {
        toast.error(err.response?.data?.message || "login failed!");
      }
    }
  })

  return (
    <>
      <div className='min-h-screen bg-[#D9EAFD] flex justify-center items-center px-3'>
        <div className='bg-[#F2F9FF] w-full max-w-md p-6 sm:p-8 rounded shadow-xl'>
          <form onSubmit={formik.handleSubmit}>
            <h1 className='font-bold text-2xl sm:text-3xl text-[#154D71] text-center'>Login</h1>

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
              onClick={(e) => e.stopPropagation()}
              className='w-full h-10 mt-6 bg-[#154D71] text-white font-semibold rounded outline-none cursor-pointer hover:bg-[#123a56]'>Login
            </button>

            <div className='flex justify-center gap-2 bg-white mt-5 h-10 rounded shadow-md p-2 items-center outline-none'>
              <FcGoogle size={25} />
              <button
                type='button'
                onClick={() => {
                  window.location.href = "http://localhost:5000/api/auth/google";
                }}
                className='font-semibold text-gray-800 cursor-pointer outline-none'>Continue With Google</button>
            </div>
            
            <p className='font-semibold text-gray-700 mt-3 text-center sm:text-base'>Don't have an account?
              <span
                onClick={() => navigate('/signup')}
                className='text-[#154D71] cursor-pointer'> Sign Up</span></p>
          </form>
        </div >
      </div >
    </>
  )
}

export default Login
