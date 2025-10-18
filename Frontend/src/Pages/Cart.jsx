import React, { useContext, useEffect, useState } from "react";
import Title from "../Componenets/Title";
import { ShopContext } from "../Context/ShopContext";
import bin from "../assets/frontend_assets/bin_icon.png";
import Total from "../Componenets/Total";

const Cart = () => {
  const { products, currency, cartIntems, UpdateQuantity, navigate } =
    useContext(ShopContext);

  const [cartdata, setcartdata] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempdata = [];
      for (const items in cartIntems) {
        for (const item in cartIntems[items]) {
          if (cartIntems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              quantity: cartIntems[items][item],
            });
          }
        }
      }
      setcartdata(tempdata);
    }
  }, [cartIntems, products]);

  const handleRemove = () => {};

  return (
    <div>
      <div className="text-3xl flex justify-center mt-8">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className="mt-5">
        {cartdata.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-b border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : UpdateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => UpdateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={bin}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <Total />
          <button
            onClick={() => navigate("/placeorder")}
            className="px-10 py-4 text-xs bg-black text-white mt-15 active:bg-white active:text-black border cursor-pointer"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
