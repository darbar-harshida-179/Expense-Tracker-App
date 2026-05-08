// frontend/src/pages/Login.jsx

import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { IoEyeSharp } from "react-icons/io5";
import { PiEyeSlashFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

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
    onSubmit(values, { resetForm }) {
      try {
        console.log("Login successfull!", values);
        resetForm();
        toast.success("Login Successfull!")
      } catch (err) {
        console.log("Error:-", err.message);
        toast.error("Error:-", err.message);
      }
    }
  })
  return (
    <>
      <div className='min-h-screen bg-[#D9EAFD] flex justify-center items-center'>
        <div className='bg-[#F2F9FF] w-full max-w-md p-8 rounded shadow-xl'>
          <form onSubmit={formik.handleSubmit}>
            <h1 className='font-bold text-2xl text-[#154D71] text-center'>Login</h1>
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
                className='absolute top-1/2 right-3  cursor-pointer text-[#154D71]'>
                {showPassword ? <IoEyeSharp size={23} /> : <PiEyeSlashFill size={23} />}
              </div>
            {formik.touched.password && formik.errors.password && (
              <p className='text-red-500'>{formik.errors.password}</p>
            )}
        </div>
        <button
          type='submit'
          className='w-full h-10 mt-6 bg-[#154D71] text-white font-semibold rounded outline-none cursor-pointer hover:bg-[#213555]'>Login
        </button>
        <p className='font-semibold text-gray-700 mt-3 text-center'>Don't have an account?
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
