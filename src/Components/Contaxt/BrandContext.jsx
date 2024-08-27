import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext } from 'react'
import { useState } from 'react'

export let BrandContext = createContext()

export default function BrandContextProvider({children}) {
  const [brandCollocation, setBrandCollocation] = useState([])
  const [brandCollocationId, setBrandCollocationId] = useState([])
  const [loading, setLoading] = useState(false)
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }


  let dataBrands = useQuery({
    queryKey : ['dataBrands'],
    queryFn : getBrands,
    gcTime : 300000,
    select:(data)=> data?.data.data
  })

async function getBrandsCollocation(id) {
  try{
    setLoading(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
    setBrandCollocation(data.data)
    setBrandCollocationId(data.data.map((product)=> product._id))
    setLoading(false)
  }catch(err){
    console.log(err);
    setLoading(false)
  }
  }


  return <BrandContext.Provider value={{dataBrands , getBrandsCollocation, brandCollocationId , brandCollocation , loading}}>
  {children}
  </BrandContext.Provider>
}
