import React, { useState } from 'react'
import style from './MainSlider.module.css'
import image1 from '../../assets/images/slider-image-1.jpeg'
import image2 from '../../assets/images/slider-image-2.jpeg'
import image3 from '../../assets/images/slider-image-3.jpeg'
import Slider from "react-slick";


export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
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

    
  return <>
    
    <div className="flex py-4">
      <div className="w-full cursor-pointer">
      <div className="slider-container">
      <Slider {...settings}>
      <img src={image1} className="h-[400px]" alt="" />
      <img src={image2} className="h-[400px]" alt="" />
      <img src={image3} className="h-[400px]" alt="" />
    </Slider>
    </div>
      </div>
      </div>
  </>
}
