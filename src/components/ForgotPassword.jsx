import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, BASE_URL } from '../config/api';

import '../Stylings/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        navigate('/'); // redirect to login after success
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  return (
    <div className="forget-password-container">
      <div className="hero-header">
        <h1>Flex Fuel</h1>
      </div>
      <div className="forget-password-card">
        <h2 className="forget-password-title">Forgot Password</h2>
         <div className="instruction-box">
          <p><strong>Reset your password in 3 simple steps:</strong></p>
          <ul className="instruction-list">
            <li>1. Enter the email address you used to sign up.</li>
            <li>2. Click on "Send Reset Link".</li>
            <li>3. A password reset link will be sent to your <strong>recovery email</strong>.</li>
            <li>4. Click that link to reset your password. It will expire in <strong>15 minutes</strong>.</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="forget-password-form">
          <label className="form-label">Enter your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            placeholder="your-email@example.com"
          />
          <button
            type="submit"
            className="submit-button"
          >
            Send Reset Link
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
