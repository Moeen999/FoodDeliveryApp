import { useState } from "react";
import ExploreMenu from "../../ExploreMenu/ExploreMenu";
import Header from "../../header/header";
import "./Home.css";

const Home = () => {

  const [category,setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  );
};

export default Home;
