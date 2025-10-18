import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import drop from '../assets/frontend_assets/dropdown_icon.png'
import Title from '../Componenets/Title';
import ProductItems from '../Componenets/ProductItems';
const Collection = () => {

  const {products}=useContext(ShopContext);
  const [showfilter,setShowfilter]=useState(false);
  const [filter,setFilter]=useState([]);
  const [category,setcategory]=useState([]);
  const [subcategory,setsubcategory]=useState([]);
  const [sorttype,setsortype]=useState('relevant')
  const {search,sosearch}=useContext(ShopContext);

  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setcategory(prev=>prev.filter(item=>item!==e.target.value))
    }else{
      setcategory(prev=>[...prev,e.target.value])
    }
  }

  const toggleSubCategory=(e)=>{
    if(subcategory.includes(e.target.value)){
      setsubcategory(prev=>prev.filter(item=>item!==e.target.value))
    }else{
      setsubcategory(prev=>[...prev,e.target.value])
    }
  }

  const Applyfilter=()=>{
    let productsCopy=products.slice();
    if (sosearch && search) {
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length>0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category))
    }
    if(subcategory.length>0){
      productsCopy=productsCopy.filter(item=>subcategory.includes(item.subCategory))
    }
    setFilter(productsCopy)
  }

  useEffect(()=>{
    Applyfilter();
  },[category,subcategory,search,sosearch,products])

  const sortproduct=()=>{
    let fpCopy=filter.slice()
    switch(sorttype){
      case 'low-high':
        setFilter(fpCopy.sort((a,b)=>(a.price-b.price)))
        break;
      case 'high-low':
        setFilter(fpCopy.sort((a,b)=>(b.price-a.price)))
        break;
      default:
        Applyfilter();
        break;
    }
  }
  useEffect(()=>{
    sortproduct();
  },[sorttype])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          Filters
          <img onClick={()=>{showfilter?setShowfilter(false):setShowfilter(true)}} className={`h-3 sm:hidden ${showfilter?'rotate-90':''}`} src={drop} alt="img" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter?"":'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory}/>Kids
            </p>
          </div>
        </div>
        <div className={`border border-gray-300 pl-5 py-3 my-6 ${showfilter?"":'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory}/>WinterWear
            </p>
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'Collections'}/>
          <select onChange={(e)=>setsortype(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value='relevant'>Sort by:Relevant</option>
            <option value='low-high'>Sort by:low to high</option>
            <option value='high-low'>Sort by:high to low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filter.map((item,index)=>(
              <ProductItems key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
