import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts'
import Loading from '../Loading/Loading'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import { useQuery } from '@tanstack/react-query'
import useProducts from '../../Hooks/useProducts'
import { CartContext } from '../Contaxt/CartContext'
import { WishListContext } from '../Contaxt/WishlistContext'

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('');
let {getCart} = useContext(CartContext)
let {getWishList} = useContext(WishListContext)
  let {data , isLoading , isFetching , isError , error} = useProducts()
  

const handleChange = (event) => {
  setSearchTerm(event.target.value);
};

const filteredProducts = data?.filter((product)=>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);
    


  return <>
{!isLoading ?<>
    <div className='w-[90%] mx-auto'>
    <MainSlider/>
    <CategoriesSlider/>
    <input value={searchTerm} onInput={handleChange}  type="text" id="first_name" className=" w-[95%] mx-auto mt-9 border border-green-300 text-gray-900 text-sm rounded-lg transition duration-300 focus:ring-green-500 focus:border-green-500 block p-2.5" placeholder="search..." />
  <div className="w-full mx-auto my-10 grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
  {filteredProducts.map((product , index)=> <RecentProducts key={index} product={product}/>)}
  </div>
      </div> </>: <Loading/>}  
  </>
}
