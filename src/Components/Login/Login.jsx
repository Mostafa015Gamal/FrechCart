import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Contaxt/UserContext'
import { Spinner } from 'flowbite-react'
import toast from 'react-hot-toast'



export default function Login() {
  const [loading, setLoading] = useState(false)

let {setUserData} = useContext(UserContext)

let navigate = useNavigate()
async function login(values) {
    try{
      setLoading(true)
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
      navigate("/")
      console.log(data);
      
      localStorage.setItem('userToken' , data.token)
      setUserData(data.token)
      toast.success(`Welcome ${data.user.name}`, 
        {
          duration: 2000,
          position:'top-center'
        }
      )

    }catch(err){
      console.log(err.response.data.message);
      setLoading(false)
      toast.error(err.response.data.message , 
        {
          duration: 4000,
          position:'top-center'
        }
      )
      console.log(err.response);
    }
  }

  let validationSchema = yup.object().shape(
    {
      email: yup.string().email('invalid mail').required('This field is required'),
    }
  )

  let formik = useFormik(
    {
      initialValues: {
        email: '',
        password: '',
      }, validationSchema,
      onSubmit: login
    }
  )
  return <>

    <div className='max-sm:w-11/12 sm:w-11/12 md:w-9/12  lg:w-[50%] mx-auto mt-28'>
    <h1 className="text-2xl my-6">Login :</h1>
    <form className="" onSubmit={formik.handleSubmit}>
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
      <div className='flex justify-between items-center'>
        <Link to={'/passwordProcess'} className='hover:underline hover:text-gray-600 mt-5 text-gray-600 '>Forget your password?</Link>
        {loading ? <div className="w-[50%] flex justify-end"> <button type="button" className="text-white bg-[#0aad0a] mt-5 font-medium rounded-md text-lg px-10 pt-1.5 pb-2 text-center flex justify-center items-center">
          <Spinner color="success" className='text-green-400 animate-spin fill-white' aria-label="Success spinner example" /> </button> </div>:  <div className="w-[50%] flex justify-end"> <button type="submit" className="text-white mt-5 bg-[#0aad0a] focus:outline-none font-medium text-[17px] rounded-md px-7 py-2 text-center">Login</button> </div>}
      </div>
        
    </form>
    </div>

  </>
}
