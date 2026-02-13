import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Stylings/Navbar.css';
import Menu from './Menu';
import { FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const Navbar = () => {
  


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMembership, setHasMembership] = useState(false);
  const navigate = useNavigate();
  <Menu setIsMenuOpen={setIsMenuOpen} />
  // Fetch membership status
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get(`${API_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (res.data?.membership?.isActive) {
          setHasMembership(true);
        }
      })
      .catch((err) => {
        console.error('Error checking membership status:', err);
      });
  }, []);

  // Get the token and role from localStorage
  const token = localStorage.getItem('token');
  const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).role === 'admin' : false;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="logo">Flex Fuel</Link>

      {/* Navbar Links Container */}
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/home">Home</Link></li>
        <div className="dropdown">
          <span>Training Hub <FaChevronDown /></span>  {/* Add icon here */}
          <div className="dropdown-content">
            <Link to="/workout">Workout Log</Link>
            <Link to="/trainer">Trainer</Link>
            <Link to="/register-trainer">Create Trainer Listing</Link>
            <Link to="/video-tutorials">Exercise Videos</Link>
          </div>
        </div>

        <div className="dropdown">
          <span>Information  <FaChevronDown /></span>
          <div className="dropdown-content">
            <Link to="/about">About Us</Link>
            <Link to="/community">Community</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="dropdown">
          <span>Shop <FaChevronDown /></span> {/* Add icon here */}
          <div className="dropdown-content">
            <Link to="/product">Products</Link>
            <Link to="/fitness-cart">Cart</Link>
            <li><Link to="/enlist-fitness-product">Enlist</Link></li>
          </div>
        </div>
        <li className="dropdown">
          <span>Others <FaChevronDown /></span>
          <div className="dropdown-content">
            <Link to="/ChatApp">ChatBot</Link>
            <Link to="/my-orders">My Orders</Link>
            {hasMembership && <Link to="/seller-orders">Product Sales</Link>}
           
          </div>
        </li>
        <Link to="/join-us" className="join-us-btn">Join Us</Link>


         {/* Pass setIsLoggedIn as a prop to Menu */}
      </ul>
    </nav>
  );
};

export default Navbar;
