import axios from "axios";
import "./MyOrders.css";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../Context/StoreContext";
const MyOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { token } = useContext(StoreContext);
  console.log(token);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsersOrder();
    }
  }, []);

  return <div>Hey Nigga</div>;
};

export default MyOrders;
