import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";

const List = () => {
  const [foodData, setFoodData] = useState([]);
  const SERVER_URL = "http://localhost:4000";
  const fetchFoodItemsData = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/food/list`);
      if (res.data.success) {
        toast.success("Items fetched successfully");
        setFoodData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodItemsData();
  }, []);

  return(
    <div>
      {foodData?.map((food)=>{
        return(
          <div>{food.name}</div>
        )
      })

      }
    </div>
  )
};

export default List;
