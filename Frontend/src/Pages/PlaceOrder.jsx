import React, { useContext, useState } from "react";
import Title from "../Componenets/Title";
import Total from "../Componenets/Total";
import strip from "../assets/frontend_assets/stripe_logo.png";
import razor from "../assets/frontend_assets/razorpay_logo.png";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backend_url,
    token,
    cartIntems,
    setcartItems,
    getTotalAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setformdata((data) => ({ ...data, [name]: value }));
  };
  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      let orderitems = [];
      for (const items in cartIntems) {
        for (const item in cartIntems[items]) {
          if (cartIntems[items][item] > 0) {
            const iteminfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (iteminfo) {
              iteminfo.size = item;
              iteminfo.quantity = cartIntems[items][item];
              orderitems.push(iteminfo);
            }
          }
        }
      }
      let orderdata = {
        address: formdata,
        items: orderitems,
        amount: getTotalAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const res = await axios.post(
            backend_url + "/api/order/cod",
            orderdata,
            { headers: { token } }
          );
          if (res.data.success) {
            setcartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }
          break;
        case 'stripe':
          const ress=await axios.post(backend_url+'/api/order/stripe',orderdata,{headers:{token}})
          if(ress.data.success){
            const {session_url}=ress.data
            window.location.replace(session_url)
            setcartItems({})
            toast.success("Order placed")
          }else{
            toast.error(ress.data.message)
          }
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmithandler}
      className="flex flex-col sm:flex-row justify-around gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstname"
            value={formdata.firstname}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastname"
            value={formdata.lastname}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formdata.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formdata.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formdata.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formdata.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formdata.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="ZipCode"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formdata.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formdata.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          required
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <Total />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={strip} alt="" />
            </div>
            <div
              onClick={() => setMethod("razor")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razor" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={razor} alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="px-15 py-3 text-xs bg-black text-white mt-5 active:bg-white active:text-black border cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
