import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";

const Navbar = () => {
  const [isActive, setIsActive] = useState("home");
  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" className="logo" />
      <ul className="navbar-menu">
        <li
          onClick={() => setIsActive("home")}
          className={isActive === "home" ? "active" : ""}
        >
          home
        </li>
        <li
          onClick={() => setIsActive("menu")}
          className={isActive === "menu" ? "active" : ""}
        >
          menu
        </li>
        <li
          onClick={() => setIsActive("mobile-app")}
          className={isActive === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </li>
        <li
          onClick={() => setIsActive("contact-us")}
          className={isActive === "contact-us" ? "active" : ""}
        >
          contact-us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="searchicon" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
