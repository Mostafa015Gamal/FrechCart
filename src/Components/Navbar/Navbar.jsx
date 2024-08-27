import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Contaxt/UserContext'
import { CartContext } from '../Contaxt/CartContext'
import { WishListContext } from '../Contaxt/WishlistContext'

export default function Navbar2() {
const [flag, setFlag] = useState(true)

function toggleNavBar() {
  if (flag) {
    setFlag(false);
    }
    else setFlag(true)
}

  let navigate = useNavigate()
  let {userData , setUserData} = useContext(UserContext)
  let {wishlistId} = useContext(WishListContext)
  let {cart} =  useContext(CartContext)

  function logOut() {
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')
  }


    
  return <>
      <nav className={`bg-gray-100 py-7 w-full transition-all duration-300 ${flag ? 'h-20' : `${userData ? 'max-md:h-72': 'max-md:h-40'} md:h-20`}`}>
      <div className='flex justify-between items-center w-11/12  md:w-[90%] mx-auto'>
      <div className='flex items-center'>
          <div><img src={logo} className={`pe-8 ${userData ? '' : 'md:w-80'}`} alt="" /></div>
          <div className={`w-[90%] max-md:absolute max-md:z-30  transition  ${flag ? 'opacity-0 -top-64 duration-0 md:opacity-100' : 'opacity-100 max-md:top-[5.2rem] duration-200 delay-200'}`}>
            <ul className='flex md:space-x-4 capitalize  max-md:flex-col max-md:space-y-2'>
              {userData  ? <><li><NavLink to="" onClick={()=>(setFlag(true))} className='block'>Home</NavLink></li>
            <li><NavLink to="cart" onClick={()=>(setFlag(true))} className='block'>cart</NavLink></li>
            <li><NavLink to="products" onClick={()=>(setFlag(true))} className='block'>products</NavLink></li>
            <li><NavLink to="categories" onClick={()=>(setFlag(true))} className='block'>categories</NavLink></li>
            <li><NavLink to="brands" onClick={()=>(setFlag(true))} className='block'>brands</NavLink></li>
            <li onClick={()=>{logOut() ; setFlag(true)}} className='cursor-pointer md:hidden block'><span>logout</span></li></> : <>
            <li><NavLink className=" text-gray-500 md:hidden" onClick={()=>(setFlag(true))} to="login">login</NavLink></li>
            <li><NavLink className=" text-gray-500 md:hidden" onClick={()=>(setFlag(true))} to="register">register</NavLink></li>
            </>}
            
      
          </ul>
          </div>
        </div>
        <div>
        <ul className='flex space-x-9 capitalize'>
        {userData ?<>
            <li title='cart' className='relative'><Link to='cart'><i className="fa-solid fa-cart-shopping text-green-600 transition duration-300 text-[17px] hover:text-green-400 cursor-pointer"></i>  {!cart?.numOfCartItems == 0? <span className='absolute w-5 h-5 text-slate-200 flex justify-center items-center rounded-full bg-[#0aad0a] -top-4 -right-4'>{cart.numOfCartItems}</span>  : ''} </Link></li>
            <li title='wishlist' className='relative'> <Link to='wishlist'><i className="fa-solid fa-heart text-red-700 text-[19px] hover:text-red-500 transition duration-300 cursor-pointer"></i>  {!wishlistId.length == 0?<span className='absolute w-5 h-5 text-gray-200 flex justify-center items-center rounded-full bg-red-600 -top-4 -right-4'>{wishlistId.length}</span>  : ''} </Link> </li>
            <li onClick={()=>logOut()} className='cursor-pointer max-md:hidden'><span>logout</span></li>
            {flag ? <li className='cursor-pointer md:hidden' onClick={()=>toggleNavBar()}><i className="fa-solid fa-bars text-xl"></i></li> : <li className='cursor-pointer md:hidden ' onClick={()=>toggleNavBar()}><i className="fa-solid fa-xmark text-2xl"></i></li>}
            </>
            : <>
            <li><NavLink className=" text-gray-500 max-md:hidden block"  to="login">login</NavLink></li>
            <li><NavLink className=" text-gray-500 max-md:hidden block"  to="register">register</NavLink></li>
            {flag ? <li className='cursor-pointer md:hidden' onClick={()=>toggleNavBar()}><i className="fa-solid fa-bars text-xl"></i></li> : <li className='cursor-pointer md:hidden ' onClick={()=>toggleNavBar()}><i className="fa-solid fa-xmark text-2xl"></i></li>}
            </>}
        </ul>
        </div>
      </div>
      </nav>
  </>
}
