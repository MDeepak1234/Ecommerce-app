import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import searchicon from '../assets/frontend_assets/search_icon.png'
import cross from '../assets/frontend_assets/cross_icon.png'
import { useLocation } from 'react-router-dom'


const SearchBar = () => {

    const {search,sosearch ,setsearch,setsosearch}=useContext(ShopContext);
    const location=useLocation();
    const [visible,setvisible]=useState(false);
    useEffect(()=>{
        if(location.pathname.includes('collection')&&sosearch){
            setvisible(true);
        }else{
            setvisible(false);
        }
    },[location])
  return sosearch&&visible?(
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>
        <input value={search} onChange={(e)=>setsearch(e.target.value)} type='text' placeholder='Search' className='flex-1 outline-none text-sm bg-inherit'/>
        <img className='w-4' src={searchicon} alt="img" />
      </div>
      <img onClick={()=>setsosearch(false)} className='inline w-3 cursor-pointer' src={cross} alt="cross" />
    </div>
  ):null
}

export default SearchBar
