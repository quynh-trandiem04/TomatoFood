import React, { useContext, useEffect, useState } from 'react'
import "./CheckoutComplete.css"
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const CheckoutComplete = () => {
  const { orders } = useContext(StoreContext)
  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    if (orders && orders.length > 0) {
      setLastOrder(orders[0])
    }
  }, [orders])

  const generateOrderNumber = (id) => {
    return `TF${id.toString().slice(-8).toUpperCase()}`
  }

  return (
    <div className='checkout-complete-page'>
      {/* Breadcrumb */}
      <div className="site-breadcrumb">
        <div className="site-breadcrumb-bg"></div>
        <div className="breadcrumb-container">
          <div className="site-breadcrumb-wrap">
            <h4 className="breadcrumb-title">Checkout Complete</h4>
            <ul className="breadcrumb-menu">
              <li><Link to="/">Home</Link></li>
              <li className="active">Checkout Complete</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      {/* Shop Checkout Complete */}
      <div className="shop-checkout-complete">
        <div className="checkout-complete-container">
          <div className="checkout-complete-content">
            <div className="checkout-complete-icon">✓</div>
            <h3>Thank you for your order!</h3>
            <p>
              Your order has been placed and will be processed as soon as possible. Make sure you make note of 
              your order number, which is <b>{lastOrder ? generateOrderNumber(lastOrder.id) : 'Processing...'}</b>. 
              You will be receiving an email shortly with confirmation of your order.
            </p>
            <div className="checkout-complete-actions">
              <Link to="/orders" className="theme-btn secondary">
                View Orders
              </Link>
              <Link to="/" className="theme-btn">
                Go Back Shopping →
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Shop Checkout Complete End */}
    </div>
  )
}

export default CheckoutComplete
