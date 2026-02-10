import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Stylings/Myorder.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Shipping:</strong> {order.buyer.streetNumber}, {order.buyer.street}, {order.buyer.city}, {order.buyer.country}</p>
            <p><strong>Phone:</strong> {order.buyer.phone}</p>

            <div className="products">
              {order.products.map((p, i) => (
                <div key={i} className="product">
                  <img src={`http://localhost:5000/${p.image}`} alt={p.name} />
                  <div>
                    <p><strong>{p.name}</strong></p>
                    <p>Price: Rs {p.price}</p>
                    <p>Qty: {p.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
