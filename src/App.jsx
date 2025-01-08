import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Products from './components/Product';
import Cart from './components/Cart';
import Contact from './components/Contact';
import About from './components/About';
import LoginSignup from './components/Login_Signup';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutPage from './components/logout';
import LogoutButton from './components/LogoutButton';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import AdminDashboard from './components/AdminDashboard';
import ProductList from './components/addtoCart';
import './Stylings/App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(decoded.role === 'admin');
      } catch (error) {
        console.error('Error decoding token', error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <Router>
      {/* Navbar should only be shown if logged in */}
      {isLoggedIn && <Navbar isAdmin={isAdmin} />} {/* Pass isAdmin to Navbar */}

      <Routes>
        {/* Login and Signup Route */}
        <Route path="/" element={<LoginSignup setIsLoggedIn={setIsLoggedIn} />} />
        
        {/* Protected Routes (Require login) */}
        <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HomePage /><LogoutButton setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
        <Route path="/Products" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Products /><LogoutButton setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
        <Route path="/Cart" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Cart /><LogoutButton setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
        
        {/* Routes without Navbar */}
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/search" element={<SearchResults />} />
        
        {/* Product details page */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/product-list" element={<ProductList />} />  {/* Add the ProductList route */}

        
        {/* Admin Routes */}
        {/* Protect Admin Routes based on isAdmin */}
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
