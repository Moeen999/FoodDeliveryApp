import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/pages/Home/Home";
import Cart from "./components/pages/Cart/Cart";
import PlaceOrder from "./components/pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
