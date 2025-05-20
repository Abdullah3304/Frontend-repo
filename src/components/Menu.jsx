import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Stylings/Menu.css'; // Import the CSS for styling the menu

const Menu = ({ setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage items (token and cart)
    localStorage.removeItem('token');
    localStorage.removeItem('cart');

    // Set login status to false
    setIsLoggedIn(false);

    // Redirect to the login/signup page after logout
    navigate('/');
  };

  return (
    <div className="menu-container">
      {/* Menu Icon for mobile or desktop (toggle dropdown) */}
      <div
        className={`menu-icon ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Dropdown Menu */}
      <div className={`menu-options ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/tutorial-chat" className="menu-item">
          Tutorial Chat
        </Link>
        <Link to="/settings" className="menu-item">
          Settings
        </Link>
        
      </div>
    </div>
  );
};

export default Menu;


