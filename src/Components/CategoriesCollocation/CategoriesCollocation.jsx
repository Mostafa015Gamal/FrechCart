import React, { useContext, useState } from 'react'
import style from './CategoriesCollocation.module.css'
import { CategoryContext } from '../Contaxt/CategoryContext'
import { Link } from 'react-router-dom'
import { CartContext } from '../Contaxt/CartContext'
import { WishListContext } from '../Contaxt/WishlistContext'
import Loading from '../Loading/Loading'

export default function CategoriesCollocation() {

  
  let {addProductToCart} = useContext(CartContext)
  let {addProductToWishList , deleteProduct ,wishlistId} = useContext(WishListContext)
  let {categoryCollection , loading} = useContext(CategoryContext)



function toggleIconHeart(e , Id) {
  if (!e.classList.contains('text-red-600')) {
    addProductToWishList(Id)
    e.classList.add('text-red-600')
  }else{
    deleteProduct(Id)
    e.classList.remove('text-red-600')
  }
}

if (loading) return <Loading/>

  return <>
  {!categoryCollection.length == 0 ? <div className="w-[90%] mx-auto my-10 grid grid-cols-5 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
    {categoryCollection.map((categoryCollection , index)=> <>
      <div key={index} className="product border-2 border-[#0aad0a] border-opacity-0 hover:border-opacity-100 transition duration-100 relative p-2 hover:p-4 group">
      <div className='w-1/6 absolute top-6 right-3 opacity-0 group-hover:opacity-100 duration-400'><i onClick={(e)=>{toggleIconHeart(e.target , categoryCollection.id)}} className={`fa-solid ${wishlistId.find((id)=> id == categoryCollection.id) ? 'text-red-600' : ''} fa-heart text-xl `}></i></div>
    <Link to={`/productDetails/${categoryCollection.id}`}>
    <div>
      <img src={categoryCollection.imageCover} className='w-full' alt={categoryCollection.title} />
      <h2 className='text-main text-sm'>{categoryCollection.category?.name}</h2>
      <h2 className='font-medium'>{categoryCollection.title?.split(' ').slice(0,2).join(' ')}</h2>
      <div className="flex justify-between my-2">
        <h3>{categoryCollection.price} EGP</h3>
        <h3><i className='rating-color fas fa-star'></i> {categoryCollection.ratingsAverage} </h3>
      </div>
    </div>
    </Link>
        <button onClick={()=>addProductToCart(categoryCollection.id)} className='btn w-full bg-main rounded-sm text-white py-1'>Add to card</button>
    </div>
    </>)}
    </div> :<>
        <div className='flex justify-center items-center w-full h-[80vh]'>
          <h1 className='bg-[#3bbd3b] p-3 text-white rounded-lg me-4'>There are no products yet</h1> 
          <Link to={`/categories`} className='text-[18px]'><i className="fa-solid fa-arrow-left"></i> Back</Link>
        </div></>}
  </>
}
