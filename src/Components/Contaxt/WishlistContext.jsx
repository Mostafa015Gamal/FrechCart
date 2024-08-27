import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export let WishListContext = createContext()
let headers = {
  token : localStorage.getItem("userToken")
}
export default function WishListContextProvider({children}) {
  
  const [loading, setLoading] = useState(false)
const [wishlist, setWishList] = useState({})
const [wishlistId, setWishListId] = useState([])

  async function addProductToWishList(productId){
    try{
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
        {
          productId
        },
        {
          headers
        });
        toast.success(data.message , 
          {
            duration: 4000,
            position:'top-center'
          }
        )
        // setWishList(data)
      setWishListId(data.data)
      getWishList()
    }catch(err){
      console.log(err);
    }
  }
  async function getWishList(){
    try{
      setLoading(true)
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , 
        {
          headers
        }
      )
      setLoading(false)
      setWishList(data)
      setWishListId(data.data.map((product)=> product.id))
    }catch(err){
      console.log(err);
      setLoading(false)
    }
  }
  async function deleteProduct(productId){
    try{
      let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers
        });
        // setWishList(data)
        setWishListId(data.data)
        getWishList()
        toast.success(data.message , 
          {
            duration: 4000,
            position:'top-center'
          }
        )
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    async function getData() {
      await getWishList()
    }
    getData()
  },[])
  return <WishListContext.Provider value={ {addProductToWishList , wishlist , setWishList , wishlistId , getWishList , deleteProduct , loading} }>
    {children}
  </WishListContext.Provider>
}
