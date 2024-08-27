import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { Children, useState } from 'react'
import { createContext } from 'react'

export let CategoryContext = createContext()

export default function CategoryContextProvider({children}) {
const [loading, setLoading] = useState(false)
const [categoryCollection, setCategoryCollection] = useState([])
  
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}

let dataCategory = useQuery({
  queryKey : ['dataCategory'],
  queryFn : getCategories,
  gcTime : 3000,
  select:(data)=> data?.data.data
})



async function getCategoryCollection(id) {
  try{
    setLoading(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)
    setCategoryCollection(data.data)
    console.log(data.data);
    setLoading(false)
  }catch(err){
    console.log(err);
    setLoading(false)
  }
  
}

  return <CategoryContext.Provider value={{ dataCategory , getCategoryCollection ,categoryCollection , setCategoryCollection , loading}}>
    {children}
  </CategoryContext.Provider>
}
