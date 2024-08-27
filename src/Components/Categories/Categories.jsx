import React, { useContext, useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import CategoryContextProvider, { CategoryContext } from '../Contaxt/CategoryContext'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function Categories() {
let {dataCategory , getCategoryCollection} = useContext(CategoryContext)
let {data , isLoading} = dataCategory

if (isLoading) return <Loading/>


  return <>
      <div className='my-20 w-[90%] m-auto'>
      <div className='grid lg:grid-cols-5 max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 gap-8'>
        {dataCategory?.data.map((categories , index)=> <>
        <Link to={`/categoriesCollocation/${categories._id}`} key={index}>
        <div className='cursor-pointer' onClick={()=>getCategoryCollection(categories._id)}>
          <img src={categories.image} className='h-[280px] max-sm:h-[350px] w-full' alt="" />
          <h3 className='mt-2'>{categories.name}</h3>
        </div>
        </Link>
        </>)}
      </div>
    </div>

  </>
}
