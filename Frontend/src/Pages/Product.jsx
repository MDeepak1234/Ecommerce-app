import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import star from '../assets/frontend_assets/star_icon.png';
import Related from "../Componenets/Related";
const Product = () => {
  const { productId } = useParams();
  const { products,currency,addToCart } = useContext(ShopContext);
  const [productdata, setproductdata] = useState(false);
  const [image, setimage] = useState("");
  const [size,setsize]=useState('');

  const fetchProductdata = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setproductdata(item);
        setimage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductdata();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId, products]);
  return productdata ?( 
  <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
    <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
      <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
          {
            productdata.image.map((item,index)=>(
              <img onClick={()=>setimage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt="" />
            ))
          }
        </div>
        <div className="w-full sm:w-[80%]">
          <img src={image} alt="" className="w-full h-auto"/>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="font-medium text-2xl mt-2">{productdata.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <img src={star} alt="" className="w-3 5" />
          <img src={star} alt="" className="w-3 5" />
          <img src={star} alt="" className="w-3 5" />
          <img src={star} alt="" className="w-3 5" />
          <img src={star} alt="" className="w-3 5" />
          <p className="pl-2">(122)</p>
        </div>
        <p className="mt-5 text-3xl font-medium">{currency}{productdata.price}</p>
        <p className="mt-5 text-gray-500 md:w-4/5">{productdata.description}</p>
        <div className="flex flex-col gap-4 my-8">
          <p>Select Size</p>
          <div className=" flex gap-2">
            {productdata.sizes.map((item,index)=>(
              <button onClick={()=>setsize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item===size?'border-orange-500':''}`} key={index} >{item}</button>
            ))}
          </div>
        </div>
        <button onClick={()=>addToCart(productdata._id,size)} className=" bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer">ADD TO CART</button>
        <hr className="mt-8 sm:w-4/5"/>
        <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
          <p>100% Original</p>
          <p>Cash On Delivery is available</p>
          <p>Easy Return and Exchange</p>
        </div>
      </div>
    </div>
    <div className="mt-20">
      <div className="flex">
        <b className="border px-5 py-3 text-sm">Description</b>
        <p className="border px-5 py-3 text-sm">Reveiws (122)</p>
      </div>
      <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod eum dicta placeat error ipsa sint nulla, excepturi, asperiores tempora rerum temporibus odit enim accusamus provident, id consequatur. Laboriosam, aperiam commodi.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, impedit error! Mollitia aliquid doloremque architecto placeat. Amet, accusantium eius totam possimus vel unde adipisci consectetur? Nesciunt itaque natus eos nam.</p>
      </div>
    </div>
    <Related category={productdata.category} subCategory={productdata.subCategory}/>
  </div>
  ):<div className="opacity-0"></div>
};

export default Product;
