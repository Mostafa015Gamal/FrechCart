import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export let CartContext = createContext()


export default function CartContextProvider({children}) {
  const [loading, setLoading] = useState(false)

  let headers = {
    token : localStorage.getItem("userToken")
  }

  const [cart, setCart] = useState(null)

  async function addProductToCart(productId){
    try{
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
        {
          productId
        },
        {
          headers
        });
        console.log(data);
        toast.success('It has been successfully added.' , 
        {
          duration: 4000,
          position:'top-center'
        }
      )
      setCart(data)
    }catch(err){
      console.log(err);
    }
  }
  async function getCart(){
    try{
      setLoading(true)
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers
        });
        setCart(data)
        setLoading(false)
      }catch(err){
        console.log(err);
        setLoading(false)
      }
    }
    async function updateProductCount(productId , count){
      if (count > 0) {
        try{
          let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
              count
            },{
              headers
            });
            setCart(data)
          }catch(err){
            console.log(err);
          }
        }else{
          deleteProduct(productId)
        }
      }
    async function deleteProduct(productId){
      try{
        let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          {
            headers
          });
        setCart(data)
      }catch(err){
        console.log(err);
      }
    }
    async function deleteCart(){
      try{
          await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
          {
            headers
          });
          setCart(null)
      }catch(err){
        console.log(err);
      }
    }

    async function checkOut(shippingAddress){
      try{
        setLoading(true)
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`, 
          {
            shippingAddress
          },
          {
            headers
          });
          console.log(data);
          window.location.href = data.session.url
          setLoading(false)
      }catch(err){
        console.log(err);
        setLoading(false)
      }
    }

    useEffect(()=>{
      getCart()
    },[])
    
      return <CartContext.Provider value={{ addProductToCart , getCart , cart , setCart , updateProductCount , deleteProduct , deleteCart , checkOut , loading}}>
    {children}
  </CartContext.Provider>
}