import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Stylings/JoinUs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JoinUs = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [membership, setMembership] = useState(null);
  const [countdown, setCountdown] = useState('');

  const calculateCountdown = (expiresAt) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires - now;

    if (diff <= 0) {
      setCountdown('Expired');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const parsed = JSON.parse(jsonPayload);
      setEmail(parsed.email || '');
    } catch (error) {
      console.error('Error decoding token', error);
    }

    axios.get('http://localhost:5000/api/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        const { membership } = res.data;
        setMembership(membership);

        if (membership?.isActive && membership?.expiresAt) {
          calculateCountdown(membership.expiresAt);
          const interval = setInterval(() => {
            calculateCountdown(membership.expiresAt);
          }, 1000);
          return () => clearInterval(interval);
        }
      })
      .catch(err => {
        console.error('Error fetching membership:', err);
      });
  }, []);

  const handleBuyMembership = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token || !password || !cardName || !cardNumber || !expiry || !cvv) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/buy-membership',
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMembership(res.data.membership);
      toast.success('Membership activated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to activate membership.');
    }
  };

  return (
    <div className="joinus-container">
      <div className="joinus-box">
        <h2>Join Us & Become a Member</h2>
        {membership?.isActive ? (
          <div className="membership-active">
            <p className="active-text">
              ✅ Your membership is active!
            </p>
            <p>
              It will expire on: <strong>{new Date(membership.expiresAt).toLocaleString()}</strong>
            </p>
            <p>⏳ Time remaining: <span className="countdown">{countdown}</span></p>
          </div>
        ) : (
          <>
            <p className="membership-price">Only Rs. 9999/month</p>
            <p className="benefits-text">
              ✔ Register your trainer sessions<br />
              ✔ Sell fitness products on our platform<br />
              ✔ Get exclusive access to members-only features
            </p>
            <form onSubmit={handleBuyMembership} className="joinus-form">
              <input type="email" value={email} disabled className="disabled-input" />
              <input
                type="password"
                placeholder="Your Account Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Cardholder Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Card Number"
                maxLength="16"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
              <div className="card-row">
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  maxLength="3"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Buy Membership</button>
            </form>
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default JoinUs;
