import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Stylings/ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')

  const getApiUrl = () => {
    if (process.env.NODE_ENV === 'production') {
      // Use the production backend URL (replace with your actual backend URL on Vercel)
      return process.env.REACT_APP_BACKEND_URL || 'https://backend-repo-green.vercel.app/api/auth/reset-password';
    } else {
      // Use localhost for local development
      return 'http://localhost:5000/api/auth/reset-password';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(getApiUrl(), { confirm, newPassword, token });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  console.log("<<<<<<<<<>>>>>>>>>>>")

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h1 className="brand-title">
          <span className="Flex">Fitness</span>
          <span className="Fuel">Hub</span>
        </h1>
        <h2 className="reset-heading">Reset Your Password</h2>

        <form onSubmit={handleSubmit} className="reset-form">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter new password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            placeholder="Confirm new password"
          />

          <button type="submit" className="reset-button">
            Reset Password
          </button>
        </form>

        {message && <p className="message-success">{message}</p>}
        {error && <p className="message-error">{error}</p>}
      </div>
    </div>
  );
};
export default ResetPassword;
