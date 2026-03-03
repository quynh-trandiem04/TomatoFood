import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = () => {
    const[menu,setMenu] = useState("home");
    const { getTotalCartAmount, token, setShowLogin, logout, cartItems, food_list, removeFromCart, addToCart } = useContext(StoreContext);
    const navigate = useNavigate();

    const getCartItemCount = () => {
      let count = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) count += cartItems[item];
      }
      return count;
    };
    
  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="Food Del Logo" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul> 
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="dropdown-cart">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          {getCartItemCount() > 0 && (
            <span className="cart-badge">{getCartItemCount()}</span>
          )}
          
          {/* Dropdown Cart Menu */}
          <div className="dropdown-cart-menu">
            <div className="dropdown-cart-header">
              <span>{getCartItemCount().toString().padStart(2, '0')} Items</span>
              <Link to="/cart">View Cart</Link>
            </div>
            <ul className="dropdown-cart-list">
              {food_list.map((item) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <li key={item._id}>
                      <div className="dropdown-cart-item">
                        <div className="cart-img">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="cart-info">
                          <h4>{item.name}</h4>
                          <p className="cart-price"><span className="cart-amount">${item.price}</span></p>
                          <div className="cart-qty-controls">
                            <button className="qty-btn" onClick={() => removeFromCart(item._id)}>−</button>
                            <span className="qty-value">{cartItems[item._id]}</span>
                            <button className="qty-btn" onClick={() => addToCart(item._id)}>+</button>
                          </div>
                        </div>
                        <span className="cart-remove" onClick={() => removeFromCart(item._id)}>×</span>
                      </div>
                    </li>
                  );
                }
                return null;
              })}
              {getTotalCartAmount() === 0 && (
                <li className="empty-cart-msg">Your cart is empty</li>
              )}
            </ul>
            {getTotalCartAmount() > 0 && (
              <div className="dropdown-cart-bottom">
                <div className="dropdown-cart-total">
                  <span>Total</span>
                  <span className="total-amount">${getTotalCartAmount().toFixed(2)}</span>
                </div>
                <button className="theme-btn" onClick={() => navigate('/cart')}>Checkout</button>
              </div>
            )}
          </div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/orders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
