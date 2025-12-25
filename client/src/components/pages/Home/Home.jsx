import { useState } from "react";
import ExploreMenu from "../../ExploreMenu/ExploreMenu";
import Header from "../../header/header";
import "./Home.css";
import FoodDisplay from "../../FoodDisplay/FoodDisplay";

const Home = () => {

  const [category,setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
    </div>
  );
};

export default Home;
