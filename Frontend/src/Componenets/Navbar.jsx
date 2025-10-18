import React, { useContext, useState } from "react";
import logo from "../assets/frontend_assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import search from "../assets/frontend_assets/search_icon.png";
import profile from "../assets/frontend_assets/profile_icon.png";
import cart from "../assets/frontend_assets/cart_icon.png";
import menu from "../assets/frontend_assets/menu_icon.png";
import drop from "../assets/frontend_assets/dropdown_icon.png";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const { setsosearch, getcartCount, navigate, settoken, token, setcartItems } =
    useContext(ShopContext);
  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    setcartItems({});
    navigate("/login");
  };
  return (
    <div className="w-full flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={logo} alt="" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-3/5 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-3/5 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-3/5 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-3/5 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setsosearch(true)}
          src={search}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer"
            src={profile}
            alt=""
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg">
                <p className="cursor-pointer hover:text-black">My profile</p>
                <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={cart} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">
            {getcartCount()}
          </p>
        </Link>
        <img
          onClick={() => setvisible(true)}
          src={menu}
          className="sm:hidden w-5 cursor-pointer"
          alt=""
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setvisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={drop} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setvisible(false)}
            className="py-2 pl-6 border-2"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            className="py-2 pl-6 border-2"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            className="py-2 pl-6 border-2"
            to="/contact"
          >
            CONTACT
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            className="py-2 pl-6 border-2"
            to="/about"
          >
            ABOUT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
