import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId'); // Replace with your auth method
      const res = await axios.get(`http://localhost:5000/api/orders/${userId}`);
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📦 My Past Orders</h1>
      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <ul>
            {order.items.map(item => (
              <li key={item._id}>{item.quantity} x {item.name} - ${item.price}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
