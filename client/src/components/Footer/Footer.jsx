import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Choose from a diverse menu featuring delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our meal
            satisfy your cravings and elevate your dining experience, one
            delicious meal at a time.
          </p>
          <div className="footer-social-icons">
            <Link
              to="https://www.facebook.com/share/17s4wF8Uy6/"
              target="_blank"
            >
              <img src={assets.facebook_icon} alt="" />
            </Link>
            <Link
              to="https://www.linkedin.com/in/moeen-malik-b8b526360?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
            >
              <img src={assets.linkedin_icon} alt="" />
            </Link>
            <Link to="https://x.com/MoeenNazak" target="_blank">
              <img src={assets.twitter_icon} alt="" />
            </Link>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-234-56789</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        By Moeen © {new Date().getFullYear()} Tomato.com - All rights reserved
      </p>
    </div>
  );
};

export default Footer;
