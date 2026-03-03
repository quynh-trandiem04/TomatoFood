import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/payment')
  }

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" placeholder='Enter first name' required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" placeholder='Enter last name' required />
          </div>
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" placeholder='Enter email address' required />
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input type="text" placeholder='Enter street address' required />
        </div>
        <div className="multi-fields">
          <div className="form-group">
            <label>City</label>
            <input type="text" placeholder='Enter city' required />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" placeholder='Enter state' required />
          </div>
        </div>
        <div className="multi-fields">
          <div className="form-group">
            <label>Zip Code</label>
            <input type="text" placeholder='Enter zip code' required />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" placeholder='Enter country' required />
          </div>
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder='Enter phone number' required />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
