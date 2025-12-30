import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; 
    const { itemId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    cartData[itemId] = cartData[itemId] ? cartData[itemId] + 1 : 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId; 
    const { itemId } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item removed from Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
  }
};

// Get cart data
const getCartData = async (req, res) => {
  try {
    const userId = req.userId; 

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
  }
};

export { addToCart, removeFromCart, getCartData };
