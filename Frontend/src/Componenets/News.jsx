import React from 'react'

const News = () => {
    const onSubmitHandler=(e)=>{
        e.preventDefault();
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Register now & get 20% off</p>
      <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sequi alias exercitationem amet eveniet quos, illum vero necessitatibus nostrum consectetur similique. Ducimus facilis consequuntur, ut reiciendis explicabo quos repellat numquam!</p>
      <form className='w-full sm:w-1/2 gap-3 flex items-center my-6 border pl-3 mx-auto'>
        <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your Email' required></input>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4 cursor-pointer'>REGISTER</button>
      </form>
    </div>
  )
}

export default News
