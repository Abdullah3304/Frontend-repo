import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Footer from './components/Footer'; // Add this line
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import AdminDashboard from './components/AdminDashboard';
import ProductList from './components/addtoCart';
import TrainerMain from './components/Trainer_Main';
import CommunityPage from './components/CommunityPage';
import WorkoutPage from './components/WorkoutPage';
import JoinUs from './components/JoinUs';
import VideoTutorials from './components/VideoTutorials';
import MaleTrainers from './components/MaleTrainers'; // Import Male Trainers Component
import FemaleTrainers from './components/FemaleTrainers'; // Import Female Trainers Component
import RegisterTrainer from './components/RegisterTrainer'; // Import Register Trainer Component
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword'
import Receipt from './components/Receipt';
import TrainerReceipt from './components/TrainerReceipt';
import MyOrders from './components/MyOrders';
import ChatApp from './components/ChatApp';
import HireTrainer from './components/HireTrainer';
import './Stylings/App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state
  const location = useLocation();

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
  
   // Hide navbar on login and logout pages
  const hideNavbarRoutes = ['/', '/logout'];
  const shouldShowNavbar = isLoggedIn && !hideNavbarRoutes.includes(location.pathname);
  
  return (
    <>
      {shouldShowNavbar && <Navbar isAdmin={isAdmin} />}

      <Routes>
        {/* Login and Signup Route */}
        <Route path="/" element={<LoginSignup setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected Routes (Require login) */}
        <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HomePage /><LogoutButton setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
        <Route path="/Products" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Products /><LogoutButton setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
        <Route path="/Cart" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Cart /><LogoutButton setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
        <Route path="/trainer" element={<ProtectedRoute isLoggedIn={isLoggedIn}><TrainerMain /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CommunityPage /></ProtectedRoute>} />
        <Route path="/workout" element={<ProtectedRoute isLoggedIn={isLoggedIn}><WorkoutPage /></ProtectedRoute>} />
        <Route path="/video-tutorials" element={<ProtectedRoute isLoggedIn={isLoggedIn}><VideoTutorials /></ProtectedRoute>} /> {/* Route for Video Tutorials */}

        {/* Trainer Routes */}
        <Route path="/trainer/male" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MaleTrainers /></ProtectedRoute>} />
        <Route path="/trainer/female" element={<ProtectedRoute isLoggedIn={isLoggedIn}><FemaleTrainers /></ProtectedRoute>} />
        <Route path="/register-trainer" element={<ProtectedRoute isLoggedIn={isLoggedIn}><RegisterTrainer /></ProtectedRoute>} />
        <Route path="/hire-trainer/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HireTrainer /></ProtectedRoute>} />        
        <Route path="/trainer-receipt" element={<TrainerReceipt />} />
        {/* Routes without Navbar */}
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/ChatApp" element={<ChatApp />} />

        {/* Product details page */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/product-list" element={<ProductList />} />  {/* Add the ProductList route */}
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* Admin Routes */}
        {/* Protect Admin Routes based on isAdmin */}
        <Route path="/admin" element={<AdminDashboard />} />
        
      </Routes>
      {shouldShowNavbar && <Footer />}
      
      
    </>
  );
};

export default App;
