import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({}); 
  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [orders, setOrders] = useState([]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = food_list.find((food) => food._id === itemId);
      if (item) {
        total += item.price * cartItems[itemId];
      }
    }
    return total;
  };

  const addOrder = (orderData) => {
    if (!token) return null; // Must be logged in
    
    const orderItems = [];
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = food_list.find((food) => food._id === itemId);
        if (item) {
          orderItems.push({
            ...item,
            quantity: cartItems[itemId]
          });
        }
      }
    }
    
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: orderItems,
      subtotal: getTotalCartAmount(),
      deliveryFee: 2,
      total: getTotalCartAmount() + 2,
      status: 'Processing',
      paymentMethod: orderData.paymentMethod || 'Card'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCartItems({});
    
    // Save to localStorage per user
    const userOrdersKey = `orders_${token}`;
    const savedOrders = JSON.parse(localStorage.getItem(userOrdersKey) || "[]");
    localStorage.setItem(userOrdersKey, JSON.stringify([newOrder, ...savedOrders]));
    
    return newOrder;
  };

  const logout = () => {
    setToken("");
    setOrders([]); // Clear orders on logout
    localStorage.removeItem("token");
  };

  // Load orders when token changes
  useEffect(() => {
    if (token) {
      const userOrdersKey = `orders_${token}`;
      const savedOrders = JSON.parse(localStorage.getItem(userOrdersKey) || "[]");
      setOrders(savedOrders);
    } else {
      setOrders([]);
    }
  }, [token]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = { 
    food_list, 
    cartItems, 
    addToCart, 
    removeFromCart, 
    getTotalCartAmount,
    token,
    setToken,
    showLogin,
    setShowLogin,
    logout,
    orders,
    addOrder
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
