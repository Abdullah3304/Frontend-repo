import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Stylings/SellerOrders.css';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setSellerId(JSON.parse(user)._id);
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/orders/seller-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching seller orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrders = () => {
    if (orders.length === 0) {
      console.log("Orders received:", orders);

        return <p>No orders found.</p>;
      
    }

    return orders.map((order) => {
              
        const sellerProducts = order.products; // Show all products

    console.log("Seller products:", sellerProducts);

      if (sellerProducts.length === 0) return null;

      return (
        <div className="order-card" key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

          <div className="products">
            {sellerProducts.map((product) => (
              <div className="product" key={product._id}>
                <img
                  src={`http://localhost:5000/${product.image.replace(/\\/g, '/')}`}
                  alt={product.name}
                />
                <div>
                  <h4>{product.name}</h4>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="buyer-info">
            <h4>Buyer Info</h4>
            <p>Email: {order.buyer?.buyerGmail}</p>
            <p>Phone: {order.buyer?.phone}</p>
            <p>Address: {order.buyer?.streetNumber}, {order.buyer?.street}, {order.buyer?.city}, {order.buyer?.country}</p>
            <p>Payment: {order.paymentMethod}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="seller-orders">
      <h2>Seller Orders</h2>
      {loading ? <p>Loading orders...</p> : renderOrders()}
    </div>
  );
};

export default SellerOrders;
