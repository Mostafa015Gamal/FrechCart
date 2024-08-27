import React, { useState } from 'react'
import style from './Products.module.css'
import useProducts from '../../Hooks/useProducts';
import RecentProducts from '../RecentProducts/RecentProducts';
import Loading from '../Loading/Loading';

export default function Products() {

  const [searchTerm, setSearchTerm] = useState('');

  let {data , isLoading , isFetching , isError , error} = useProducts()


const handleChange = (event) => {
  setSearchTerm(event.target.value);
};

const filteredProducts = data?.filter((product)=>
  product.title?.toLowerCase().includes(searchTerm.toLowerCase())
);

    
  return <>
    
    <div className='py-20'>
  {isLoading ? <Loading/> : <> <input value={searchTerm} onInput={handleChange}  type="text" id="first_name" className="bg-gray-50 w-[70%] mx-auto mt-9 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5" placeholder="search..." required />
  <div className="w-[90%] mx-auto my-10 grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
  {filteredProducts?.map((product , index)=> <RecentProducts key={index} product={product}/>)}
  </div> </>}
    </div>
  
  </>
}
