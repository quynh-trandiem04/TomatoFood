import React, { useContext, useState } from 'react'
import "./Payment.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
  const { getTotalCartAmount, addOrder } = useContext(StoreContext)
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('card')

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    
    // Save the order
    const paymentName = paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'
    addOrder({ paymentMethod: paymentName })
    
    navigate('/checkout-complete')
  }

  return (
    <div className='payment'>
      <div className="payment-container">
        <div className="payment-left">
          <h2>Payment Method</h2>
          <div className="payment-methods">
            <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="payment" 
                value="card" 
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-icon">💳</span>
              <span>Credit/Debit Card</span>
            </label>
            <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="payment" 
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-icon">💵</span>
              <span>Cash on Delivery</span>
            </label>
          </div>

          {paymentMethod === 'card' && (
            <form className="card-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="Enter card number" maxLength="19" required />
              </div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input type="text" placeholder="Enter cardholder name" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" maxLength="5" required />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="CVV" maxLength="4" required />
                </div>
              </div>
              <button type="submit" className="pay-btn">Pay ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</button>
            </form>
          )}

          {paymentMethod === 'cod' && (
            <div className="cod-section">
              <p>You will pay when your order is delivered.</p>
              <button onClick={handleSubmit} className="pay-btn cod-btn">Confirm Order</button>
            </div>
          )}
        </div>

        <div className="payment-right">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getTotalCartAmount()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>${getTotalCartAmount() === 0 ? 0 : 2}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
