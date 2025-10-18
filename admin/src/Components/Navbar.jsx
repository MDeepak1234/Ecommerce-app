import React from 'react'
import logo from '../assets/admin_assets/logo.png'
const Navbar = ({settoken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={logo} alt="" />
      <button onClick={()=>settoken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 text-xs sm:text-xs rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
