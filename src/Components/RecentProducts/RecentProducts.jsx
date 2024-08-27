import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import style from './RecentProducts.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../Contaxt/CartContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { WishListContext } from '../Contaxt/WishlistContext';
import useProducts from '../../Hooks/useProducts';



export default function RecentProducts({product}) {
let {addProductToCart} = useContext(CartContext)
let {addProductToWishList , deleteProduct ,wishlistId} = useContext(WishListContext)

let findWishList = Boolean(wishlistId.find((id)=> id == product._id))


function toggleIconHeart(e , Id) {
  if (!e.classList.contains('text-red-600')) {
    addProductToWishList(Id)
    e.classList.add('text-red-600')
  }else{
    deleteProduct(Id)
    e.classList.remove('text-red-600')
  }
}
  return <>
    <div className="product border-2 border-[#0aad0a] border-opacity-0 hover:border-opacity-100 transition duration-100 relative p-2 hover:p-4 group">
    <div className='w-1/6 absolute top-6 right-3 opacity-0 group-hover:opacity-100 duration-400'><i onClick={ (e)=>{toggleIconHeart(e.target , product.id)}} className={`fa-solid fa-heart text-xl ${findWishList ?'text-red-600' : ''} hover:text-red-500 transition duration-300 cursor-pointer`}></i></div>
    <Link className='hover:text-gray-700' to={`/productDetails/${product.id}`}>
    <div>
      <img src={product.imageCover} className='w-full' alt={product.title} />
      <h2 className='text-main text-sm'>{product.category.name}</h2>
      <h2 className='font-medium'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
      <div className="flex justify-between my-2">
        <h3>{product.price} EGP</h3>
        <h3><i className='rating-color fas fa-star'></i> {product.ratingsAverage} </h3>
      </div>
    </div>
    </Link>
        <button onClick={()=>addProductToCart(product.id)} className='btn w-full bg-main rounded-sm text-white py-1'>Add to card</button>
    </div>
  </>
}
