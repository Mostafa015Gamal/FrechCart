import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';


export default function CategoriesSlider() {
  const [categories, setCategories] = useState([])

  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    accessibility: false,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows:false,
    autoplay:true, responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  async function getRecentCategories(){
    try{
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    
      setCategories(data.data)
    }catch(err){
      console.log(err);
    }
    }
    
    useEffect(()=>{
      getRecentCategories()
    },[])
    
        

    
  return <>
    <div className='pt-5 pb-12'>
      <h1>Shop Popular Categories</h1>
      <div className="slider-container">
    <Slider {...settings}>
  {categories?.map((category , index)=> <div key={index}>
    <img src={category.image} className='cursor-pointer w-full h-[200px]' alt="" />
    <h3> {category.name} </h3>
  </div>)}
    </Slider>
    </div>
    </div>
  
  </>
}
