import React from 'react'
import logo from'../assets/frontend_assets/logo.png'
const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={logo} alt="" className='mb-5 w-32' />
          <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam numquam, mollitia minus praesentium beatae architecto! Tempora perspiciatis, dignissimos vitae eveniet sequi magnam sunt non. Unde aperiam magni quae consequatur corporis!</p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>Get In Touch</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
              <li>+1 412-1098-615</li>
              <li>contact@Forever.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr/>
        <p className='py-5 text-sm text-center'>Copyright 2025@Forever.com - All rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
