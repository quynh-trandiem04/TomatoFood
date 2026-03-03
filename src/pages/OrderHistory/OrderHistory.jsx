import React, { useContext } from 'react'
import "./OrderHistory.css"
import { StoreContext } from '../../context/StoreContext'

const OrderHistory = () => {
  const { orders } = useContext(StoreContext)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Processing': return '#f0ad4e'
      case 'Delivered': return '#5cb85c'
      case 'Cancelled': return '#d9534f'
      default: return '#777'
    }
  }

  return (
    <div className='order-history'>
      <div className="order-history-container">
        <div className="order-history-header">
          <h2>Order History</h2>
          <p>View all your past orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <h3>No orders yet</h3>
            <p>When you place orders, they will appear here</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-info">
                    <span className="order-id">Order #{order.id}</span>
                    <span className="order-date">{formatDate(order.date)}</span>
                  </div>
                  <span 
                    className="order-status" 
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
                
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="order-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="order-item-info">
                        <h4>{item.name}</h4>
                        <p className="item-qty">Qty: {item.quantity}</p>
                      </div>
                      <div className="order-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div className="payment-method">
                    <span>Payment: </span>
                    <strong>{order.paymentMethod}</strong>
                  </div>
                  <div className="order-total">
                    <span>Total: </span>
                    <strong>${order.total.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
