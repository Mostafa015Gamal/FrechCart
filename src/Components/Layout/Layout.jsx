import React, { useContext, useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../Contaxt/UserContext.jsx'

export default function Layout() {
let {setUserData} = useContext(UserContext)
let navigate = useNavigate();

useEffect(()=>{
  if (localStorage.getItem('userToken')) {
    setUserData(localStorage.getItem('userToken'))
  }else{
    navigate('/login')
  }
},[])


  return <>
    <Navbar />
    <div className="md:pt-5">
      <Outlet></Outlet>
    </div>
  </>
}
