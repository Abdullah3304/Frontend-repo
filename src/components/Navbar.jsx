import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylings/Navbar.css';
const Navbar = () => {
     // Get the token and role from localStorage
  const token = localStorage.getItem('token');
  const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).role === 'admin' : false;
  return (
    <nav className="navbar">
      <Link to="/home" className="logo">ShopMate</Link>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
        {isAdmin && (<li><Link to="/admin">Admin Panel</Link></li>)}
      </ul>
    </nav>
  );
};

export default Navbar;
