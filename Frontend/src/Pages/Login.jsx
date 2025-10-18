import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

  const [currstate,setcurrstate]=useState('Login');
  const {token,settoken,navigate,backend_url}=useContext(ShopContext);
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')

  const onSubmithandler=async(e)=>{
    e.preventDefault();
    try {
      if (currstate==='Sign Up') {
        const res=await axios.post(backend_url+"/api/user/register",{name,email,password})
        if (res.data.success) {
          settoken(res.data.token);
          localStorage.setItem('token',res.data.token)
        }else{
          toast.error(res.data.message)
        }
      }else{
        const res=await axios.post(backend_url+"/api/user/login",{email,password})
        if(res.data.success){
          settoken(res.data.token)
          localStorage.setItem('token',res.data.token);
        }else{
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token])
  return (
    <form onSubmit={onSubmithandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-2xl'>{currstate}</p>
        <hr  className='boder-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currstate==='Login'?'': <input onChange={(e)=>setname(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800 rounded-sm' placeholder='Name' required/>}
      <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800 rounded-sm' placeholder='Email Address' required/>
      <input onChange={(e)=>setpassword(e.target.value)} password={password} type="password" className='w-full px-3 py-2 border border-gray-800 rounded-sm' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot Password?</p>
          {currstate==='Login'?<p onClick={()=>setcurrstate('Sign Up')} className='cursor-pointer'>Create a account</p>:<p onClick={()=>setcurrstate('Login')} className='cursor-pointer'>Login Here</p>}
      </div>
      <button className='bg-black text-white font-light border px-12 py-3 text-sm mt-5 active:bg-white active:text-black'>{currstate==='Login'?'Login':'Sign Up'}</button>
    </form>
  )
}

export default Login
