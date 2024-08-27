import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Products from './Components/Products/Products.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import UserContextProvider from './Components/Contaxt/UserContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './Components/Contaxt/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import Checkout from './Components/Checkout/Checkout.jsx'
import Allorders from './Components/Allorders/Allorders.jsx'
import Wishlist from './Components/Wishlist/Wishlist.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishListContextProvider from './Components/Contaxt/WishlistContext.jsx'
import CategoriesCollocation from './Components/CategoriesCollocation/CategoriesCollocation.jsx'
import CategoryContextProvider from './Components/Contaxt/CategoryContext.jsx'
import BrandContextProvider from './Components/Contaxt/BrandContext.jsx'
import BrandsCollocation from './Components/BrandsCollocation/BrandsCollocation.jsx'
import PasswordProcess from './Components/PasswordProcess/PasswordProcess.jsx'
import VerifyCode from './Components/VerifyCode/VerifyCode.jsx'
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'

let routers = createBrowserRouter([
  {path: '' , element: <Layout/>, children :[
    {index:true , element:<ProtectedRoute> <Home/> </ProtectedRoute>},
    {path:'cart' , element:<ProtectedRoute> <Cart/> </ProtectedRoute>},
    {path:'products' , element:<ProtectedRoute> <Products/> </ProtectedRoute>},
    {path:'wishlist' , element:<ProtectedRoute> <Wishlist/> </ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
    {path:'checkout' , element:<ProtectedRoute> <Checkout/> </ProtectedRoute>},
    {path:'allorders' , element:<ProtectedRoute> <Allorders/> </ProtectedRoute>},
    {path:'brands' , element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path:'productDetails/:id' , element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
    {path:'categoriesCollocation/:id' , element: <ProtectedRoute> <CategoriesCollocation/> </ProtectedRoute>},
    {path:'brandsCollection/:id' , element: <ProtectedRoute> <BrandsCollocation/> </ProtectedRoute>},
    {path:'passwordProcess' , element: <PasswordProcess/>},
    {path:'passwordProcess/verifyCode' , element: <VerifyCode/>},
    {path:'passwordProcess/resetPassword' , element: <ResetPassword/>},
    {path:'login' , element: <Login/>},
    {path:'register' , element:<Register/>},
    {path:'*' , element:<Notfound/>},
  ]}
])

let query = new QueryClient()

function App() {
  
  return  <QueryClientProvider client={query}>
    <BrandContextProvider>
    <CategoryContextProvider>
            <WishListContextProvider>
              <CartContextProvider>
                <UserContextProvider>
                  <RouterProvider router={routers}></RouterProvider>
                  <Toaster />
                </UserContextProvider>
              </CartContextProvider>
            </WishListContextProvider>
            </CategoryContextProvider>
            </BrandContextProvider>
          </QueryClientProvider>
}

export default App
