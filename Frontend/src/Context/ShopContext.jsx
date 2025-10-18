import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [search, setsearch] = useState("");
  const [sosearch, setsosearch] = useState(false);
  const [cartIntems, setcartItems] = useState({});
  const [products, setproducts] = useState([]);
  const [token, settoken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemid, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }
    let cartdata = structuredClone(cartIntems);
    if (cartdata[itemid]) {
      if (cartdata[itemid][size]) {
        cartdata[itemid][size] += 1;
      } else {
        cartdata[itemid][size] = 1;
      }
    } else {
      cartdata[itemid] = {};
      cartdata[itemid][size] = 1;
    }
    setcartItems(cartdata);

    if (token) {
      try {
        await axios.post(
          backend_url + "/api/cart/add",
          { itemid, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getcartCount = () => {
    let total = 0;
    for (const i in cartIntems) {
      for (const item in cartIntems[i]) {
        try {
          if (cartIntems[i][item] > 0) {
            total += cartIntems[i][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return total;
  };

  const UpdateQuantity = async (itemid, size, quantity) => {
    let cartdata = structuredClone(cartIntems);
    cartdata[itemid][size] = quantity;
    setcartItems(cartdata);
    if (token) {
      try {
        await axios.post(
          backend_url + "/api/cart/update",
          { itemid, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getTotalAmount = () => {
    let totalamount = 0;
    for (const items in cartIntems) {
      let iteminfo = products.find((product) => product._id === items);
      for (const item in cartIntems[items]) {
        try {
          if (cartIntems[items][item] > 0) {
            totalamount += iteminfo.price * cartIntems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalamount;
  };

  const getProductData = async () => {
    try {
      const res = await axios.get(backend_url + "/api/product/list");
      if (res.data.success) {
        setproducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getusercart = async () => {
    try {
      const res = await axios.post(
        backend_url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setcartItems(res.data.cartData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
    }
  }, []);
  useEffect(()=>{
    if(token){
      getusercart()
    }
  },[token])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    sosearch,
    setsearch,
    setsosearch,
    cartIntems,
    addToCart,
    getcartCount,
    UpdateQuantity,
    getTotalAmount,
    navigate,
    backend_url,
    settoken,
    token,
    setcartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
