import { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/order/orders`
    );
    if (res.data.success) {
      setOrders(res.data.data);
    } else {
      toast.error("Error fetching orders!");
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="orderList">
        {orders.map((order, index) => (
          <div key={index} className="orderItem">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="orderItemFood">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="orderItemName">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="orderItemAddress">
                <p>{order.address.street + ", "}</p>
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
              <p className="orderItemPhone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select>
              <option value="Food Processing">Food Processing</option>
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
