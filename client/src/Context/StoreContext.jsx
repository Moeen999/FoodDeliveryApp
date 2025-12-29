import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const ContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodListData] = useState([]);
  const [token, setToken] = useState("");
  const addToCart = (itemID) => {
    if (!cartItems[itemID]) {
      setCartItems((prev) => ({ ...prev, [itemID]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
    }
  };
  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
  };
  const getTotalCartAmount = () => {
    let totAmount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        let itemDetails = food_list.find((product) => product._id === items);
        totAmount += itemDetails.price * cartItems[items];
      }
    }
    return totAmount;
  };

  // ! Fetch food items data from DB
  const foodListData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/food/list`
      );
      setFoodListData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await foodListData();
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
      }
    }
    loadData();
  }, []);

  const contextValues = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValues}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default ContextProvider;
