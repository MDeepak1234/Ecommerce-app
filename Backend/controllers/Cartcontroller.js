import userModel from "../models/UserModel.js";

const addtocart = async (req, res) => {
  try {
    const { userid, itemid, size } = req.body;
    const userdat = await userModel.findById(userid);

    // ✅ Ensure cartData always exists
    let cartData = userdat.cartData || {};

    if (!cartData[itemid]) {
      cartData[itemid] = {};
    }

    cartData[itemid][size] = (cartData[itemid][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userid, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updatetocart = async (req, res) => {
  try {
    const { userid, itemid, size, quantity } = req.body;
    const userdat = await userModel.findById(userid);
    const cartData = userdat.cartData;

    if (!cartData[itemid]) {
      cartData[itemid] = {};
    }

    cartData[itemid][size] = quantity;

    await userModel.findByIdAndUpdate(userid, { cartData });
    return res.json({ success: true, message: "Updated the Cart" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const getusercart = async (req, res) => {
  try {
    const { userid } = req.body;
    const userdat = await userModel.findById(userid);
    return res.json({ success: true, cartData: userdat.cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { addtocart, updatetocart, getusercart };
