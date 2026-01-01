import axios from "axios";
import "./MyOrders.css";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../Context/StoreContext";
import { assets } from "../../../assets/assets";
import { toast } from "react-toastify";
const MyOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { token } = useContext(StoreContext);
  const fetchUsersOrder = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setUserOrders(res.data.data);
      }
      toast.success("Orders fetched successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchUsersOrder();
  }, [token]);

  return (
    <div className="myOrders">
      <h2>My Orders</h2>
      <div className="ordersContainer">
        {userOrders.map((order, index) => {
          return (
            <div className="myOrdersOrder">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
