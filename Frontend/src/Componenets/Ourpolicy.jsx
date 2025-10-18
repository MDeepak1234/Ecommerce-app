import React from 'react'
import exchange from '../assets/frontend_assets/exchange_icon.png'
import quality from '../assets/frontend_assets/quality_icon.png'
import support from '../assets/frontend_assets/support_img.png'
const Ourpolicy = () => {
  return (
    <div className='flex fex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md-text-base text-gray-700'>
      
        <div>
            <img className='w-12 m-auto mb-5' src={exchange} alt="" />
            <p className='font-semibold'>Easy Exchange</p>
            <p className='text-gray-400'>We offer you the free exchange policy</p>
        </div>
        <div>
            <img className='w-12 m-auto mb-5' src={quality} alt="" />
            <p className='font-semibold'>7 Days return available</p>
            <p className='text-gray-400'>We offer you a 7 days free return policy</p>
        </div>
        <div>
            <img className='w-12 m-auto mb-5' src={support} alt="" />
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400'>we offer 24/7 Customer support </p>
        </div>

    </div>
  )
}

export default Ourpolicy
