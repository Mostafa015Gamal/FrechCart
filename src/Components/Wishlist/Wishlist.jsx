import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { WishListContext } from '../Contaxt/WishlistContext'
import { CartContext } from '../Contaxt/CartContext'
import useProducts from '../../Hooks/useProducts'
import Loading from '../Loading/Loading'

export default function Wishlist() {

let {wishlist , deleteProduct , loading} = useContext(WishListContext)
let {addProductToCart} =  useContext(CartContext)

if (loading) return <Loading/>


  return <>
    
    <div className='bg-gray-50 w-[90%] mx-auto mt-24 mb-24 p-10'>
      <h1 className='text-4xl capitalize font-semibold'>wish List</h1>
    {wishlist.data?.length ? <>{wishlist.data?.map((product)=>  
    <div key={product.id} className='flex items-center max-md:flex-col gap-5 pt-7 pb-2 border-b-[1px] border-gray-300'>
      <div className='w-1/6 max-md:w-[50%]'>
        <img src={product.imageCover} className='w-full' alt="" />
      </div>
      <div className='w-5/6 max-md:w-full'>
        <div className='flex justify-between max-md:items-center'>
          <div className='max-md:w-[60%]'>
          <p className='font-semibold text-gray-800 max-lg:text-[14px]'>{product.title?.split(' ').slice(0,10).join(' ')}</p>
          <p className='font-semibold text-gray-800 py-1'>{product.price} EGP</p>
          <button onClick={()=>deleteProduct(product.id)} className='capitalize text-[14px] text-red-600'><i className="fa-solid fa-trash "></i> remove</button>
          </div>
          <div className='max-md:w-[40%] max-md:flex max-md:justify-end'>
          <button onClick={()=>{addProductToCart(product.id) ; deleteProduct(product.id)}} className='capitalize py-2 px-2.5 border rounded-md text-[16px] hover:bg-green-400 hover:text-white transition duration-200 lg:m-auto border-green-500'> add to card </button>
          </div>
        </div>
      </div>
    </div>)}</> : <h1 className='font-semibold text-2xl pt-4'>your wishlist is empty</h1>}
    </div>
  
  </>
}
