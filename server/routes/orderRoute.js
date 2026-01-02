import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrder,
  updateDeliveryStatus,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, getUserOrders);
orderRouter.get("/orders", getAllOrders);
orderRouter.post("/status", updateDeliveryStatus);

export default orderRouter;
