import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../Contaxt/CartContext'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
export default function Cart() {

let {cart , setCart , getCart , updateProductCount , deleteProduct , deleteCart , loading} = useContext(CartContext)
let navigate = useNavigate();

useEffect(()=>{
  getCart()
}, [])

    if (loading) return <Loading/> 

    if (cart?.numOfCartItems == 0) setCart(null)
      
  return<>
  <div className='bg-gray-50 w-[90%]  mx-auto mt-24 mb-24 p-10'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold'>Cart Shop</h1>
        {cart ? <Link to={"/checkout"} className="text-white bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center ">check out</Link> : ''}
      </div>
    {cart ?<>
    <div className='flex justify-between pt-7 items-center text-[18px] font-semibold'>
    <p>total price: <span className='text-green-500'>{cart?.data.totalCartPrice}</span></p>
    <p>total number of items: <span className='text-green-500'>{cart.numOfCartItems}</span></p>
  </div>
  
  {cart?.data.products.map((product)=> <> 
    <div className='flex items-center max-md:flex-col gap-5 pt-7 pb-2 border-b-[1px] border-gray-300'>
      <div className='w-1/5 max-md:w-[50%]'>
        <img src={product.product.imageCover} className='w-full' alt="" />
      </div>
      <div className='w-4/5 max-md:w-full'>
        <div className='flex justify-between '>
          <div className='max-md:w-6/12'>
          <p className='font-semibold text-gray-800'>{product.product.title?.split(' ').slice(0,10).join(' ')}</p>
          <p className='font-semibold text-gray-800 py-1'>{product.price} EGP</p>
          <button onClick={()=>deleteProduct(product.product.id)} className='capitalize text-[14px] text-red-600'><i className="fa-solid fa-trash "></i> remove</button>
          </div>
          <div className='max-md:w-6/12 max-md:flex max-md:justify-end'>
              <div className=''>
          <button onClick={()=>updateProductCount(product.product.id , product.count - 1)} className='py-1 px-2.5 border rounded-md border-green-500'><i className="fa-solid fa-minus text-[12px]"></i></button>
          <span className='px-4'>{product.count}</span>
              <button onClick={()=>updateProductCount(product.product.id , product.count+1)} className='py-1 px-2.5 border rounded-md border-green-500'><i className="fa-solid fa-plus text-[12px]"></i></button>
              </div>
          </div>
        </div>
      </div>
    </div> </>)} </> :  <h1 className='font-semibold text-2xl pt-4'>your cart is empty</h1>}
      <div className='flex mt-4'>
      {cart ? <button onClick={()=>{deleteCart() ; navigate('/')}} className='capitalize py-2 px-2.5 border rounded-md text-xl m-auto border-green-500'> Clear your carts </button> : ''}
      </div>
    </div>
    </>
}
