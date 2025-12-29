import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
const LoginPopup = ({ setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let fullURL = import.meta.env.VITE_SERVER_URL;
    if (currState === "Login") {
      fullURL += "/api/user/login";
    } else {
      fullURL += "/api/user/register";
    }
    try {
      const res = await axios.post(fullURL, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        setShowLogin(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [currState, setCurrState] = useState("Login");
  return (
    <div className="login-popup">
      <form onSubmit={handleFormSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Enter your name..."
              required
              name="name"
              onChange={handleInputChange}
              value={data.name}
            />
          )}
          <input
            type="email"
            placeholder="Enter your email..."
            required
            name="email"
            onChange={handleInputChange}
            value={data.email}
          />
          <input
            type="password"
            placeholder="Enter your password..."
            required
            name="password"
            onChange={handleInputChange}
            value={data.password}
          />
        </div>
        <button>{currState === "Sign Up" ? "Create Account" : "Log In"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p onClick={() => setCurrState("Sign Up")}>
            Create a new Account? <span>SignUp Here.</span>
          </p>
        ) : (
          <p onClick={() => setCurrState("Login")}>
            Already have an Account? <span>LogIn here.</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
