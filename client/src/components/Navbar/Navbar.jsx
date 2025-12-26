import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [isActive, setIsActive] = useState("home");
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setIsActive("home")}
          className={isActive === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setIsActive("menu")}
          className={isActive === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setIsActive("mobile-app")}
          className={isActive === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setIsActive("contact-us")}
          className={isActive === "contact-us" ? "active" : ""}
        >
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="searchicon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
