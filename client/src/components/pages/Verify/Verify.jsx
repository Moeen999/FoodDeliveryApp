import axios from "axios";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Verify = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate()  
  const verifyOrder = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/order/verify`,
        {success,orderId}
      );
      if(res.data.success){
        navigate("/myOrders");
      }else{
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    verifyOrder();
  },[])
  return (
    <div className="verify">
        <div className="spinner"></div>
    </div>
  );
};

export default Verify;
