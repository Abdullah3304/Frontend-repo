import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Stylings/Receipt.css'; // Optional: for styling

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order || JSON.parse(localStorage.getItem('lastOrder'));

  useEffect(() => {
    if (!order) {
      navigate('/products');
    }

    
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="receipt-page">
      <div className="receipt-container">
        <h1 className="receipt-header">🧾 Order Receipt</h1>
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Payment:</strong> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
        <p><strong>Total Paid:</strong> ${order.total}</p>
        <hr />
        <h3>Delivery Address</h3>
        <p>{order.address}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <hr />
        <h3>Items Ordered</h3>
        <ul>
          {order.items.map(item => (
            <li key={item._id}>
              <span>{item.quantity} x {item.name}</span> — ${item.price} each
            </li>
          ))}
        </ul>
        <hr />
        <div className="receipt-actions">
          <button onClick={() => window.print()}>🖨️ Print / Download</button>
          <button onClick={() => navigate('/products')}>🏠 Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
