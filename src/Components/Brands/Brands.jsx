import React, { useContext, useState } from 'react'
import style from './Brands.module.css'
import { BrandContext } from '../Contaxt/BrandContext'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function Brands() {


let {dataBrands , getBrandsCollocation} = useContext(BrandContext)
    let {isLoading} = dataBrands

    if (isLoading) return <Loading/>
  return <>
    <div className='grid grid-cols-5 w-[90%] max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 m-auto my-16 gap-5'>
    {dataBrands?.data.map((brand ,index)=> <>
    <Link to={`/brandsCollection/${brand._id}`} key={index} className='cursor-pointer'><img src={brand.image} onClick={()=>getBrandsCollocation(brand._id)} className='w-full h-[200px]' alt="" /></Link>
    </>)}
    </div>
  
  </>
}
