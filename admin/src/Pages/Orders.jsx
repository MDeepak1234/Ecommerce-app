import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { useState } from "react";
import { toast } from "react-toastify";
import parcel from "../assets/admin_assets/parcel_icon.svg";
const Orders = ({ token }) => {
  const [orders, setorders] = useState([]);

  const fetch = async () => {
    if (!token) {
      return null;
    }
    try {
      const res = await axios.post(
        backend_url + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setorders(res.data.order);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statushandler=async(e,orderid)=>{
    try {
      const res=await axios.post(backend_url+"/api/order/status",{orderid,status:e.target.value},{headers:{token}});
      if(res.data.success){
        await fetch()
        toast.success("Successfully Updated")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    fetch();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img className="w-12" src={parcel} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstname + " " + order.address.lastname}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentmethod}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">$ {order.amount}</p>
            <select onChange={(e)=>statushandler(e,order._id)} value={order.status} className="p-2 font-semibold">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
