import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'

const Verify = () => {
    const {navigate,token,setcartItems,backend_url}=useContext(ShopContext);
    const [searchparams,setsearchparams]=useSearchParams()
    const success=searchparams.get('success')
    const orderid=searchparams.get('orderid')
    const verifyParams=async()=>{
        try {
            if (!token) {
                return null
            }
            const res=await axios.post(backend_url+'/api/order/verifystripe',{success,orderid},{headers:{token}})
            if(res.data.success){
                setcartItems({})
                navigate('/orders')
            }else{
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        verifyParams()
    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify
