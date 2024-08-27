import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../Contaxt/CartContext';
import { WishListContext } from '../Contaxt/WishlistContext';


export default function ProductDetails() {
  let { id } = useParams()
  const [productDetails, setProductDetails] = useState([])
let {addProductToWishList , deleteProduct} = useContext(WishListContext)

function toggleIconHeart(e , Id) {
  if (!e.classList.contains('text-red-600')) {
    addProductToWishList(Id)
    e.classList.add('text-red-600')
  }else{
    deleteProduct(Id)
    e.classList.remove('text-red-600')
  }
}

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:true,
    autoplay:true,
    
  };

  let {addProductToCart} = useContext(CartContext)
  let {wishlistId} = useContext(WishListContext)
  async function getProductDetails(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

    console.log(data);
    setProductDetails(data.data)
  }

  useEffect(() => {
    getProductDetails(id)
  }, [])

  return <>


      {productDetails.images ? <>
        <div className='flex justify-end w-[85%] m-auto mt-5'>
        <Link to={`/`} className='text-[18px]'><i className="fa-solid fa-arrow-left"></i> Back</Link>
            <div className='grid ms-5'><i onClick={(e)=>{toggleIconHeart(e.target , productDetails.id)}} className={`fa-solid fa-heart ${wishlistId.find((id)=> id == productDetails.id) ?'text-red-600' : ''} cursor-pointer text-xl m-auto`}></i></div>
        </div>
        <div className="flex items-center py-8 w-[85%] m-auto max-md:flex-col max-md:w-full">
        <div className="w-1/4 max-md:w-[50%] p-4">
      {productDetails.images?.length > 1 ? <Slider {...settings}>
  {productDetails.images?.map((image , index)=> <img src={image} key={index} className='cursor-pointer w-full' alt="" />)}
    </Slider> : <img src={productDetails.imageCover} className='w-full' alt="" />}
      </div>
      <div className="w-3/4">
        <div>
          <h2 className='font-bold'> {productDetails.title.split(' ').slice(0,2).join(' ')} </h2>
          <p className='my-6 font-semibold'> {productDetails.description} </p>
          <h3> {productDetails.category?.name} </h3>
          <div className="flex justify-between my-2">
            <h3>{productDetails.price} EGP</h3>
            <h3><i className='rating-color fas fa-star'></i> {productDetails.ratingsAverage} </h3>
          </div>
          <button onClick={()=>addProductToCart(productDetails.id)} className='btn w-full bg-main rounded-md text-white py-1'> + Add to card</button>
        </div>
      </div>
      </div> </>: <Loading/>}
  </>
}
