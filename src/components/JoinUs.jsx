// src/components/JoinUs.jsx
import React, { useState } from 'react';
import '../Stylings/JoinUs.css';  // Import the new CSS file

const JoinUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        paymentDetails: {
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('payment_')) {
            setFormData(prevData => ({
                ...prevData,
                paymentDetails: {
                    ...prevData.paymentDetails,
                    [name.split('_')[1]]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
    };

    return (
        <div className="join-us-page">
            <div className="container">
                <div className="image-section">
                    <img src={require('../assets/joinus.jpg')} alt="Fitness" />
                </div>
                <div className="form-section">
                    <h1>Join Our Community!</h1>
                    <p>Become a part of our fitness family and achieve your goals together.</p>

                    <form onSubmit={handleSubmit}>
                        <h2>Membership Benefits:</h2>
                        <ul>
                            <li>Exclusive Access to fitness resources</li>
                            <li>Community Support from fellow members</li>
                            <li>Special Offers and Discounts on premium content</li>
                        </ul>

                        <h3>Enter Your Details:</h3>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Your Name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Create a Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />

                        <h3>Payment Details:</h3>
                        <div className="payment-details">
                            <input 
                                type="text" 
                                name="payment_cardNumber" 
                                placeholder="Card Number" 
                                value={formData.paymentDetails.cardNumber} 
                                onChange={handleChange} 
                                required 
                            />
                            <input 
                                type="text" 
                                name="payment_expiryDate" 
                                placeholder="Expiry Date (MM/YY)" 
                                value={formData.paymentDetails.expiryDate} 
                                onChange={handleChange} 
                                required 
                            />
                            <input 
                                type="text" 
                                name="payment_cvv" 
                                placeholder="CVV" 
                                value={formData.paymentDetails.cvv} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <button type="submit">Become a Member</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
