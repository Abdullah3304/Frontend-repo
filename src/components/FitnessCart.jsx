import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Stylings/FitnessCart.css';
import { API_BASE_URL, BASE_URL } from '../config/api';

const FitnessCart = () => {
    const [cart, setCart] = useState([]);
    const [step, setStep] = useState(1);
    const [buyerInfo, setBuyerInfo] = useState({
        country: '',
        city: '',
        street: '',
        streetNumber: '',
        phone: '',
        buyerGmail: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardInfo, setCardInfo] = useState({
        name: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const [receipt, setReceipt] = useState(null);
    const [orderTotal, setOrderTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('fitnessCart')) || [];
        setCart(savedCart);
    }, []);

    const updateCart = (id, delta) => {
        const updated = cart.map(item =>
            item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        );
        setCart(updated);
        localStorage.setItem('fitnessCart', JSON.stringify(updated));
    };

    const removeFromCart = (id) => {
        const updated = cart.filter(item => item._id !== id);
        setCart(updated);
        localStorage.setItem('fitnessCart', JSON.stringify(updated));
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleInputChange = (e) => {
        setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
    };

    const handleCardChange = (e) => {
        setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    };

    const validateStep1 = () => {
        return Object.values(buyerInfo).every(val => val.trim() !== '');
    };

    const validateStep2 = () => {
        if (paymentMethod === 'card') {
            return Object.values(cardInfo).every(val => val.trim() !== '');
        }
        return paymentMethod === 'cash';
    };

    const placeOrder = async () => {
        setLoading(true);
        setError('');
        try {
            const orderData = {
                products: cart,
                buyer: buyerInfo,
                paymentMethod,
                cardDetails: paymentMethod === 'card' ? cardInfo : null
            };
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_BASE_URL}/orders', orderData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
           setReceipt(res.data);
        const orderDetails = res.data.products;
        const customerEmail = buyerInfo.buyerGmail;

        // ✅ 2. Send confirmation email
        await axios.post(
            `${API_BASE_URL}/send-receipt',
            {
                email: customerEmail,
                orderDetails
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        // ✅ 3. Clear cart + move to receipt page
        setOrderTotal(getTotal());
        setCart([]);
        localStorage.removeItem('fitnessCart');
        setStep(3);

    } catch (err) {
        console.log(err);
        setError('Error placing order!');
    } finally {
        setLoading(false);
    }
};
    
    const formatLabel = (field) => {
        if (field === 'buyerGmail') return 'Email Address';
        return field
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    };

    return (
        <div className="cart-container">
            <h2 className="cart-heading">Fitness Cart</h2>

            {step === 1 && (
                <>
                    {cart.length === 0 ? (
                        <p className="cart-empty">Your cart is empty.</p>
                    ) : (
                        <>
                            {cart.map(item => (
                                <div
                                    key={item._id}
                                    className="cart-item"
                                >
                                    <img
                                        src={`${BASE_URL}/${item.image}`}
                                        alt={item.name}

                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h4 className="cart-item-name">{item.name}</h4>
                                        <p className="cart-item-price">Price: ${item.price}</p>
                                        <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                                        <div className="cart-item-actions">
                                            <button
                                                onClick={() => updateCart(item._id, 1)}
                                                className="cart-btn-increase"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => updateCart(item._id, -1)}
                                                className="cart-btn-decrease"
                                            >
                                                -
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="cart-btn-remove"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <h3 className="cart-total">Total: ${getTotal()}</h3>
                            <button
                                onClick={() => setStep(2)}
                                className="cart-btn-proceed"
                            >
                                Proceed to Checkout
                            </button>
                        </>
                    )}
                </>
            )}

            {step === 2 && (
                <div className="checkout-container">
                    <h3 className="checkout-heading">Shipping Information</h3>
                    <div className="checkout-form">
                        {Object.keys(buyerInfo).map(field => (
                            <input
                                key={field}
                                type={field === 'buyerGmail' ? 'email' : 'text'}
                                name={field}
                                placeholder={formatLabel(field)}
                                className="checkout-input"
                                value={buyerInfo[field]}
                                onChange={handleInputChange}
                                required
                            />
                        ))}
                    </div>

                    <h3 className="payment-heading">Payment Method</h3>
                    <div className="payment-options">
                        <label className="payment-option">
                            <input
                                type="radio"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                            />
                            Cash on Delivery
                        </label>
                        <label className="payment-option">
                            <input
                                type="radio"
                                value="card"
                                checked={paymentMethod === 'card'}
                                onChange={() => setPaymentMethod('card')}
                            />
                            Card/Debit
                        </label>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="card-form">
                            <input
                                name="name"
                                placeholder="Name on Card"
                                value={cardInfo.name}
                                className="card-input"
                                onChange={handleCardChange}
                                required
                            />
                            <input
                                name="cardNumber"
                                placeholder="Card Number"
                                value={cardInfo.cardNumber}
                                className="card-input"
                                onChange={handleCardChange}
                                required
                            />
                            <input
                                name="expiry"
                                placeholder="Expiry Date (MM/YY)"
                                value={cardInfo.expiry}
                                className="card-input"
                                onChange={handleCardChange}
                                required
                            />
                            <input
                                name="cvv"
                                placeholder="CVV"
                                value={cardInfo.cvv}
                                maxLength="3"
                                pattern="\d{3}"
                                className="card-input"
                                onChange={handleCardChange}
                                required
                            />
                        </div>
                    )}

                    {error && <p className="checkout-error">{error}</p>}
                    {loading && <p className="checkout-loading">Placing your order...</p>}

                    <div className="checkout-actions">
                        <button
                            onClick={() => setStep(1)}
                            className="checkout-btn-back"
                            disabled={loading}
                        >
                            Back
                        </button>
                        <button
                            onClick={placeOrder}
                            disabled={!validateStep1() || !validateStep2() || loading}
                            className="checkout-btn-confirm"
                        >
                            {loading ? 'Processing...' : 'Confirm Order'}
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && receipt && (
                <div className="receipt-container">
                    <button
                        onClick={() => window.print()}
                        className="receipt-btn-print"
                    >
                        Print
                    </button>

                    <h3 className="receipt-heading">Your Oder Has Been Placed Successfuly</h3>
                    <p className="receipt-id">Order ID: {receipt._id}</p>
                    <p className="receipt-email">Confirmation sent to: {receipt.buyer.buyerGmail}</p>

                    <h4 className="receipt-items-title">Items:</h4>
                    <ul className="receipt-items">
                        {receipt.products.map(item => (
                            <li key={item._id}>
                                {item.name} × {item.quantity} = ${item.quantity * item.price}
                            </li>
                        ))}
                    </ul>
                    <p className="receipt-total">Total: ${orderTotal}</p>

                    <div className="receipt-actions">
                        <button
                            onClick={() => window.location.href = '/home'}
                            className="receipt-btn-home"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FitnessCart;
