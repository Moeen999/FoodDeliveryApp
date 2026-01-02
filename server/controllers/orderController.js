import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//! 1. create a stripe instance.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const client_url = "http://localhost:5173";

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    //! 2. Create line items to create a payment link

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    //! 3. push delivery charges in line items
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    //! 4. create a session

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${client_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${client_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
  }
};
// ! verify order controller

const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
  }
};

// ! get a specific user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json();
  }
};

//! get all users order data
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured" });
  }
};

// ! update the delivery status

const updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: status });
    res.json({ success: true, message: "Status Updated Successfully!",status:status });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating the status" });
  }
};

export { placeOrder, verifyOrder, getUserOrders, getAllOrders, updateDeliveryStatus };
