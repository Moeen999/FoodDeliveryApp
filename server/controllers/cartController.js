import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    let userData = await userModel.findOne({ _id: userId });
    let cartData = await userData.cartData;
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    let userData = await userModel.findOne({ _id: userId });
    let cartData = await userData.cartData;
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item removed from Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
  }
};

const getCartData = async (req, res) => {};

export { addToCart, removeFromCart, getCartData };
