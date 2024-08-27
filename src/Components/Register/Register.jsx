import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from 'flowbite-react'
import toast from 'react-hot-toast'

export default function Register() {
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
let navigate = useNavigate()
async function register(values) {
    try{
      setLoading(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
      toast.success(data.message , 
        {
          duration: 4000,
          position:'top-center'
        }
      )
      navigate("/login")
      localStorage.setItem('userToken' , data.token)

    }catch(err){
      console.log(err.response.data.message);
      toast.error(err.response.data.message , 
        {
          duration: 4000,
          position:'top-center'
        }
      )
      setLoading(false)
    }
  }

  let validationSchema = yup.object().shape(
    {
      name: yup.string().min(3, 'min length is 3').max(20, 'max length is 10').required('name is required'),
      email: yup.string().email('invalid mail').required('email is required'),
      password: yup.string().matches(/^[A-Z]\w{5,20}$/, 'password must be starts with capital letters').required('password is required'),
      rePassword: yup.string().oneOf([yup.ref('password')], "password and rePassword don't match").required('rePassword is required'),
      phone: yup.string().matches(/^(\+2|002)?01[0125][0-9]{8}$/, 'we need egyptian phone number').required('phone  is required')
    }
  )

  let formik = useFormik(
    {
      initialValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''  
      }, validationSchema,
      onSubmit: register
    }
  )
  return <>

    <div className='max-sm:w-11/12 sm:w-11/12 md:w-9/12  lg:w-[50%] mx-auto my-7'>
    <h1 className="text-2xl my-6">Register :</h1>
    <form className="" onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name" >name:</label>
        <input type="text" name="name" value={formik.values.name} id="name" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.name && formik.touched.name && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.name}
      </div>}
      <div>
        <label htmlFor="email" >email:</label>
        <input type="email" name="email" value={formik.values.email} id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.email}
      </div>}
      <div>
        <label htmlFor="password" >password:</label>
        <input type="password" name="password" value={formik.values.password} id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.password}
      </div>}
      <div>
        <label htmlFor="rePassword" >rePassword:</label>
        <input type="password" name="rePassword" value={formik.values.rePassword} id="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.rePassword && formik.touched.rePassword && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.rePassword}
      </div>}
      <div>
        <label htmlFor="phone" >phone:</label>
        <input type="tel" name="phone" value={formik.values.phone} id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.phone}
      </div>}
        {loading ? <div className="w-full flex justify-end"> <button type="button" className="text-white bg-[#0aad0a] mt-5 font-medium rounded-md text-lg px-10 pt-1.5 pb-2 text-center flex justify-center items-center">
          <Spinner color="success" className='text-green-400 animate-spin fill-white' aria-label="Success spinner example" /> </button> </div>:  <div className="w-full flex justify-end"> <button type="submit" className="text-white mt-5 bg-[#0aad0a] focus:outline-none font-medium text-[17px] rounded-md px-7 py-2 text-center">Register</button> </div>}
        
    </form>
    </div>

  </>
}
