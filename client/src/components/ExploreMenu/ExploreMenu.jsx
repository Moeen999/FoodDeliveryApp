import React from "react";
import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring delectable array of dishes crafted
        with the finest ingredients and culinary expertise. Our meal satisfy
        your cravings and elevate your dining experience, one delicious meal at
        a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              className="explore-menu-list-item"
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img src={item.menu_image} alt="menu image" className={category === item.menu_name ? "active" : ""}/>
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
