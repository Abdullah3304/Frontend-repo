import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Stylings/Login.css';

const LoginSignup = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const endpoint = isSignup ? 'register' : 'login';

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/${endpoint}`,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('API Response:', response.data);

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);

        const userRole = response.data.role;
        if (userRole === 'admin') {
          navigate('/admin/dashboard'); // Redirect to admin dashboard
        } else {
          navigate('/home'); // Regular user
        }

        // Display success message
        if (isSignup) {
          setMessage('Account created successfully!'); // Show this after signup
        } else {
          setMessage('Logged in successfully!'); // Show this after login
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error);

      if (error.response?.data?.error === 'User already exists') {
        setMessage('This email is already registered. Please log in instead.');
      } else {
        setMessage(error.response?.data?.message || 'Email or password is incorrect');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-signup-container">
      <div className="logo-container">
        <h1 className="logo">ShopMate</h1>
      </div>
      <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>

      {/* Message display */}
      {message && (
        <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Log in' : 'No account? Sign up'}
      </button>

      {/* Only show links if the user is not logged in */}
      {!localStorage.getItem('token') && (
        <div className="links">
          <Link to="/Contact">Contact</Link>
          <Link to="/About">About Us</Link>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
