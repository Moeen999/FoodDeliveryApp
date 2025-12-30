import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../../Context/StoreContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, token, cartItems } =
    useContext(StoreContext);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    try {
      let res = await axios.post(`${SERVER_URL}/api/order/place`, orderData, {
        headers: { token },
      });
      if (res.data.success) {
        const { session_url } = res.data;
        window.location.replace(session_url);
      } else {
        toast.error("Error Occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={handleInputChange}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={handleInputChange}
            value={data.lastName}
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email address"
          name="email"
          onChange={handleInputChange}
          value={data.email}
        />
        <input
          required
          type="text"
          placeholder="Street 4 house 12 LC"
          name="street"
          onChange={handleInputChange}
          value={data.street}
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            onChange={handleInputChange}
            value={data.city}
          />
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            onChange={handleInputChange}
            value={data.state}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="Zip Code"
            name="zipcode"
            onChange={handleInputChange}
            value={data.zipcode}
          />
          <input
            required
            type="text"
            placeholder="Country"
            name="country"
            onChange={handleInputChange}
            value={data.country}
          />
        </div>
        <input
          required
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={handleInputChange}
          value={data.phone}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit" className="cart-total-button">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
