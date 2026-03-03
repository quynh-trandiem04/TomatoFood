import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Payment from "./pages/Payment/Payment";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import CheckoutComplete from "./pages/CheckoutComplete/CheckoutComplete";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { StoreContext } from "./context/StoreContext";

function App() {
  const { showLogin } = useContext(StoreContext);

  return (
    <>
      {showLogin && <LoginPopup />}
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/checkout-complete" element={<CheckoutComplete />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
