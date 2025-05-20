import React, { useState, useEffect } from 'react';
import '../Stylings/Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [step, setStep] = useState('review'); // 'review' | 'address' | 'payment' | 'confirmation'
  const [address, setAddress] = useState({ country: '', city: '', street: '', number: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardInfo, setCardInfo] = useState({ name: '', cardNumber: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleRemoveItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleUpdateQuantity = (id, qty) => {
    if (qty < 1) return;
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleNextStep = () => {
    if (step === 'review') {
      if (cartItems.length === 0) return alert('Cart is empty!');
      setStep('address');
    } else if (step === 'address') {
      const newErrors = {};
      Object.entries(address).forEach(([key, val]) => {
        if (!val.trim()) newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      });
      if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
      setErrors({});
      setStep('payment');
    } else if (step === 'payment') {
      const newErrors = {};
      if (!paymentMethod) {
        newErrors.paymentMethod = 'Select a payment method';
      }
      if (paymentMethod === 'card') {
        if (!cardInfo.name.trim()) newErrors.name = 'Name required';
        if (!/^\d{16}$/.test(cardInfo.cardNumber)) newErrors.cardNumber = 'Card number must be 16 digits';
        if (!/^\d{2}\/\d{2}$/.test(cardInfo.expiry)) newErrors.expiry = 'Expiry format MM/YY';
        if (!/^\d{3}$/.test(cardInfo.cvv)) newErrors.cvv = 'CVV must be 3 digits';
      }

      if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

      const newOrder = {
        items: cartItems,
        total: parseFloat(subtotal),
        address: `${address.street} ${address.number}, ${address.city}, ${address.country}`,
        phone: address.phone,
        date: new Date().toLocaleString(),
        paymentMethod,
        ...(paymentMethod === 'card' && { cardInfo }),
      };

      localStorage.setItem('lastOrder', JSON.stringify(newOrder));
      localStorage.removeItem('cart');
      setCartItems([]);
      navigate('/receipt', { state: { order: newOrder } });

    }
  };

  const closeModal = () => {
    setStep('review');
    setOrder(null);
    setAddress({ country: '', city: '', street: '', number: '', phone: '' });
    setPaymentMethod('');
    setCardInfo({ name: '', cardNumber: '', expiry: '', cvv: '' });
    setErrors({});
    navigate('/products');

  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="cart-container">
      <section className="cart-hero">
        <h1>Your Shopping Cart</h1>
        <p>Step: {step.charAt(0).toUpperCase() + step.slice(1)}</p>
      </section>

      {step === 'review' && (
        <section className="cart-section">
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item._id} className="cart-item">
                  <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                  </div>
                  <div className="quantity">
                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value))}
                    />
                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="item-total">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item._id)}>Remove</button>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}

          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Subtotal: <span>${subtotal}</span></p>
            <p>Shipping: <span>$0.00</span></p>
            <p>Total: <strong>${subtotal}</strong></p>
            <button className="checkout-btn" onClick={handleNextStep}>Proceed to Address</button>
          </div>
        </section>
      )}

      {step === 'address' && (
        <section className="payment-section">
          <h2>Delivery Address</h2>
          <input name="country" placeholder="Country" value={address.country} onChange={handleAddressChange} />
          {errors.country && <p className="error">{errors.country}</p>}
          <input name="city" placeholder="City" value={address.city} onChange={handleAddressChange} />
          {errors.city && <p className="error">{errors.city}</p>}
          <input name="street" placeholder="Street" value={address.street} onChange={handleAddressChange} />
          {errors.street && <p className="error">{errors.street}</p>}
          <input name="number" placeholder="Street Number" value={address.number} onChange={handleAddressChange} />
          {errors.number && <p className="error">{errors.number}</p>}
          <input name="phone" placeholder="Phone Number" value={address.phone} onChange={handleAddressChange} />
          <button className="checkout-btn" onClick={handleNextStep}>Proceed to Payment</button>
        </section>
      )}

      {step === 'payment' && (
        <section className="payment-section">
          <h2>Payment</h2>
          <label>
            <input type="radio" name="payment" value="cod" onChange={() => setPaymentMethod('cod')} />
            Cash on Delivery
          </label>
          <label>
            <input type="radio" name="payment" value="card" onChange={() => setPaymentMethod('card')} />
            Credit/Debit Card
          </label>
          {errors.paymentMethod && <p className="error">{errors.paymentMethod}</p>}

          {paymentMethod === 'card' && (
            <>
              <input name="name" placeholder="Cardholder Name" value={cardInfo.name} onChange={handleCardChange} />
              {errors.name && <p className="error">{errors.name}</p>}
              <input name="cardNumber" placeholder="Card Number (16 digits)" pattern="\s{16}" value={cardInfo.cardNumber} onChange={handleCardChange} />
              {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
              <input name="expiry" placeholder="Expiry (MM/YY)" value={cardInfo.expiry} onChange={handleCardChange} />
              {errors.expiry && <p className="error">{errors.expiry}</p>}
              <input name="cvv" placeholder="CVV" maxLength="3" type="password"
                inputMode="numeric" value={cardInfo.cvv} onChange={handleCardChange} />
              {errors.cvv && <p className="error">{errors.cvv}</p>}
            </>
          )}

          <button className="checkout-btn" onClick={handleNextStep}>
            {paymentMethod === 'card' ? 'Pay & Place Order' : 'Place Order'}
          </button>
        </section>
      )}

      {step === 'confirmation' && order && (
        <div className="modal-overlay">
          <div className="modal-content receipt">
            <h2 className="receipt-title">🧾 Order Receipt</h2>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Order Total:</strong> ${order.total}</p>
            <hr />
            <h3>Delivery Details</h3>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Payment:</strong> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
            <hr />
            <h3>Items Ordered</h3>
            <ul className="receipt-items">
              {order.items.map(item => (
                <li key={item._id}>
                  <span>{item.quantity} x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <hr />
            <p className="receipt-total"><strong>Total Paid:</strong> ${order.total}</p>
            <button className="close-modal" onClick={closeModal}>Continue Shopping</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
