import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Contaxt/UserContext'
import { CartContext } from '../Contaxt/CartContext'
import { Spinner } from 'flowbite-react'

export default function Checkout() {

  let {checkOut , loading} = useContext(CartContext)


  let validationSchema = yup.object().shape(
    {
      details: yup.string().required('This field is required'),
      phone: yup.string().matches(/^(\+2|002)?01[0125][0-9]{8}$/, 'we need egyptian phone number').required('This field is required'),
      city: yup.string().required('This field is required'),
    }
  )

  let formik = useFormik(
    {
      initialValues: {
        details: '',
        phone: '',
        city: ''
      }, validationSchema,
      onSubmit: checkOut
    }
  )
  return <>
    <div className='max-sm:w-11/12 sm:w-11/12 md:w-9/12  lg:w-[50%] mx-auto my-7'>
    <h1 className="text-2xl my-6 font-semibold text-[#0aad0a]">Checkout</h1>
    <form className="" onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="details" >details:</label>
        <input type="text" name="details" value={formik.values.details} id="details" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.details && formik.touched.details && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.details}
      </div>}
      <div>
        <label htmlFor="phone" >phone:</label>
        <input type="tel" name="phone" value={formik.values.phone} id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.phone}
      </div>}
      <div>
        <label htmlFor="city" >city:</label>
        <input type="text" name="city" value={formik.values.city} id="city" onBlur={formik.handleBlur} onChange={formik.handleChange} className='mt-1 mb-2 w-full p-2.5 border border-gray-400 rounded-md focus:border-green-500 focus:outline-none focus:ring-0 text-sm'/>
      </div>
      {formik.errors.city && formik.touched.city && <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 " role="alert">
        {formik.errors.city}
      </div>}
        {loading ? <div className="w-full flex justify-end"> <button type="button" className="text-white bg-[#0aad0a] mt-5 font-medium rounded-md text-lg px-10 pt-1.5 pb-2 text-center flex justify-center items-center">
          <Spinner color="success" className='text-green-400 animate-spin fill-white' aria-label="Success spinner example" /> </button> </div>:  <div className="w-full flex justify-end"> <button type="submit" className="text-white mt-5 bg-[#0aad0a] focus:outline-none font-medium text-[17px] rounded-md px-7 py-2 text-center">Checkout</button> </div>}
        
    </form>
    </div>
  </>
}
