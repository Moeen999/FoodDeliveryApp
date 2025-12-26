import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
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
            <input type="text" placeholder="Enter your name..." required />
          )}
          <input type="email" placeholder="Enter your email..." required />
          <input
            type="password"
            placeholder="Enter your password..."
            required
          />
        </div>
        <button>{currState === "Sign Up" ? "Create Account" : "Log In"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p onClick={()=>setCurrState("Sign Up")}>
            Create a new Account? <span>SignUp Here.</span>
          </p>
        ) : (
          <p onClick={()=>setCurrState("Login")}>
            Already have an Account? <span>LogIn here.</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
