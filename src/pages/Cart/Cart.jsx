import React, { useContext, useState } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, token, setShowLogin } = useContext(StoreContext)
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')

  const handleCheckout = () => {
    if (!token) {
      setShowLogin(true)
    } else {
      navigate('/order')
    }
  }

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2

  return (
    <div className='shop-cart'>
      <div className="container">
        <div className="shop-cart-wrap">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-table">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {food_list.map((item) => {
                        if (cartItems[item._id] > 0) {
                          return (
                            <tr key={item._id}>
                              <td>
                                <div className="shop-cart-img">
                                  <img src={item.image} alt={item.name} />
                                </div>
                              </td>
                              <td>
                                <div className="shop-cart-content">
                                  <h5 className="shop-cart-name">{item.name}</h5>
                                  <div className="shop-cart-info">
                                    <p><span>Category:</span>{item.category}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="shop-cart-price">
                                  <span>${item.price}</span>
                                </div>
                              </td>
                              <td>
                                <div className="shop-cart-qty">
                                  <button className="minus-btn" onClick={() => removeFromCart(item._id)}>−</button>
                                  <input className="quantity" type="text" value={cartItems[item._id]} disabled />
                                  <button className="plus-btn" onClick={() => addToCart(item._id)}>+</button>
                                </div>
                              </td>
                              <td>
                                <div className="shop-cart-subtotal">
                                  <span>${item.price * cartItems[item._id]}</span>
                                </div>
                              </td>
                              <td>
                                <button className="shop-cart-remove" onClick={() => removeFromCart(item._id)}>×</button>
                              </td>
                            </tr>
                          )
                        }
                        return null
                      })}
                      {getTotalCartAmount() === 0 && (
                        <tr>
                          <td colSpan="6" className="empty-cart">
                            <p>Your cart is empty</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="shop-cart-footer">
                <div className="row">
                  <div className="col-md-7">
                    <div className="shop-cart-coupon">
                      <div className="form-group">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Your Coupon Code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button className="theme-btn" type="button">Apply</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="shop-cart-btn">
                      <button className="theme-btn outline" onClick={() => navigate('/')}>
                        ← Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop-cart-summary">
                <h5>Cart Summary</h5>
                <ul>
                  <li><strong>Sub Total:</strong> <span>${getTotalCartAmount().toFixed(2)}</span></li>
                  <li><strong>Discount:</strong> <span>$0.00</span></li>
                  <li><strong>Delivery:</strong> <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span></li>
                  <li className="shop-cart-total"><strong>Total:</strong> <span>${(getTotalCartAmount() + deliveryFee).toFixed(2)}</span></li>
                </ul>
                <div className="checkout-btn-wrap">
                  <button className="theme-btn" onClick={handleCheckout} disabled={getTotalCartAmount() === 0}>
                    Checkout Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
