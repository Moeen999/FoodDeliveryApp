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
        toast.success(res.data.message);
        setFoodData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFoodItem = async (foodID) => {
    try {
      const res = await axios.post(`${SERVER_URL}/api/food/remove`, {
        id: foodID,
      });
      setFoodData(res.data.data);
      toast.success(res.data.message);
      fetchFoodItemsData();
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFoodItemsData();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {foodData?.map((item, idx) => {
          return (
            <div className="list-table-format" key={idx}>
              <img src={`${SERVER_URL}/images/` + item.image} alt="" />
              <p>{item?.name}</p>
              <p>{item?.category}</p>
              <p>${item?.price}</p>
              <p className="del" onClick={() => deleteFoodItem(item._id)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
