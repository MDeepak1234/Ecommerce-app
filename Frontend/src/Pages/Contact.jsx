import React from "react";
import Title from "../Componenets/Title";
import News from "../Componenets/News";
import contactlogo from "../assets/frontend_assets/contact_img.png";

const Contact = () => {
  return (
    <>
    <div className="text-3xl flex justify-center mt-8"><Title text1={'CONTACT'} text2={'US'}/></div>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-10 mb-10 max-w-4xl mx-auto">
      <div className="w-full sm:w-1/2 flex justify-center">
        <img className="w-full sm:w-7/8" src={contactlogo} alt="contact" />
      </div>
      <div className="text-sm gap-14 my-10 sm:my-0 sm:w-1/2 leading-relaxed">
        <h1 className="text-2xl">Our Store</h1>
        <div className="text-gray-500 text-sm font-medium pt-5 leading-relaxed">
          <p>4-11 Washington DC</p>
          <p>Tel : +1 915-474-6615</p>
        </div>

        <p className="text-gray-500 text-sm font-medium pt-5 leading-relaxed">
          Email : forever6615@gmail.com
        </p>
        <h1 className="text-2xl mt-5 leading-relaxed">Career at Forever</h1>
        <p className="text-gray-500 text-sm font-medium mt-5 leading-relaxed">
          Learn about our team and jobs here
        </p>
        <button className="border mt-8 px-8 py-3 bg-white text-black active:bg-black active:text-white">
          Explore Jobs
        </button>
      </div>
    </div>
    <News/>
    </>
  );
};

export default Contact;
