import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, BASE_URL } from '../config/api';

const Checkout = ({ cartItems }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    const orderDetails = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${API_BASE_URL}/send-receipt',
        { orderDetails, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setMessage('Checkout successful! Email sent.');
      } else {
        setMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error sending email. Check SMTP or network.');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? <p>Your cart is empty.</p> : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p><strong>Total: ${total}</strong></p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ margin: '10px 0', padding: '5px' }}
      />
      <br />
      <button onClick={handleCheckout} style={{ padding: '10px 20px' }}>Checkout</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Checkout;
