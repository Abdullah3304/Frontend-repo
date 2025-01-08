import React, { useState, useEffect } from 'react';
import '../Stylings/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility

  // Fetch cart data from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCartItems(savedCart);
    }
    setLoading(false);
  }, []);

  // Remove item from cart
  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCart = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item. Please try again.');
    }
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      {/* Cart Hero Section */}
      <section className="cart-hero">
        <h1>Your Shopping Cart</h1>
        <p>Review your items before proceeding to checkout.</p>
      </section>

      {/* Cart Items Section */}
      <section className="cart-section">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                </div>
                <div className="quantity">
                  <button
                    className="decrease"
                    onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item._id, parseInt(e.target.value, 10))
                    }
                  />
                  <button
                    className="increase"
                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Cart Summary Section */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <p>
            Subtotal:{' '}
            <span>
              $
              {cartItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </p>
          <p>
            Shipping: <span>$0.00</span>
          </p>
          <p>
            Total:{' '}
            <strong>
              $
              {(
                cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                0
              ).toFixed(2)}
            </strong>
          </p>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </section>

      {/* Checkout Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Checkout Confirmation</h2>
            <p>Thank you for shopping with us. Here's a summary of your order:</p>
            <ul>
              {cartItems.map((item) => (
                <li key={item._id}>
                  {item.quantity} x {item.name} - ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total: $</strong>
              {cartItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
            <button className="close-modal" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <p>&copy; 2024 ShopMate. All Rights Reserved.</p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>{' '}
          |{' '}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>{' '}
          |{' '}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
