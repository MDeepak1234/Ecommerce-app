import React from 'react'
import hero from '../assets/frontend_assets/hero_img.png'
import '../index.css'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141] flex flex-col gap-3 text-center sm:text-left'>
          <div className='flex items-center gap-2 justify-center sm:justify-start'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className=' prata-regular text-3xl sm:py-3 lg:text-4xl leading-relaxed'>
            LATEST ARRIVALS
          </h1>
          <div className='flex items-center gap-2 justify-center sm:justify-start'>
           <Link to="/collection"> <p className='font-semibold text-sm md:text-base'>SHOP NOW</p></Link>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
      <img className='w-full sm:w-1/2'src={hero} alt="" />
    </div>
  )
}

export default Hero
