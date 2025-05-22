import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../Stylings/Navbar.css';
import Menu from './Menu'; // Import the Menu component
import { FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
   // Track whether the mobile menu is open
   const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get the token and role from localStorage
  const token = localStorage.getItem('token');
  const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).role === 'admin' : false;
  return (
    <nav className="navbar">
      <Link to="/home" className="logo">Fitness Hub</Link>
        {/* Hamburger Menu Icon (Mobile View) */}
        {/*<div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}</div> {/* Show X or Hamburger based on menu state */}
      {/* Navbar Links Container */}
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/home">Home</Link></li>
        <div className="dropdown">
          <span>Training Hub <FaChevronDown /></span>  {/* Add icon here */}
          <div className="dropdown-content">
          <Link to="/workout">Workout Log</Link>
            <Link to="/trainer">Trainer</Link>
            <Link to="/register-trainer">Register</Link>
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
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <li><Link to="/admin">Enlist</Link></li>
          </div>
        </div>
        <Link to="/join-us" className="join-us-btn">Join Us</Link>
        
        {/* Add the Menu component for the dropdown in the top-right corner */}
        <Menu setIsLoggedIn={() => { }} />  {/* Pass setIsLoggedIn as a prop to Menu */}
      </ul>
    </nav>
  );
};

export default Navbar;
