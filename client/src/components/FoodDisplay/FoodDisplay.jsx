import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, idx) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={idx}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={`${import.meta.env.VITE_SERVER_URL}/images/`+item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
