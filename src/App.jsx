import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import Contact from './components/Contact';
import About from './components/About';
import LoginSignup from './components/Login_Signup';
import Loginbutton from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './components/AdminPanel';
import LogoutPage from './components/logout';
import LogoutButton from './components/LogoutButton';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import TrainerMain from './components/Trainer_Main';
import CommunityPage from './components/CommunityPage';
import WorkoutPage from './components/WorkoutPage';
import JoinUs from './components/JoinUs';
import VideoTutorials from './components/VideoTutorials';
import VideoDetail from './components/VideoDetail';
import MaleTrainers from './components/MaleTrainers';
import FemaleTrainers from './components/FemaleTrainers';
import RegisterTrainer from './components/RegisterTrainer';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Receipt from './components/Receipt';
import TrainerReceipt from './components/TrainerReceipt';
import MyOrders from './components/MyOrders';
import ChatApp from './components/Chatbot';
import HireTrainer from './components/HireTrainer';
import EnlistFitnessProduct from './components/EnlistFitnessProduct';
import FitnessProduct from './components/FitnessProduct';
import FitnessCart from './components/FitnessCart';
import EditFitnessProduct from './components/EditFitnessProduct'; 
import SellerOrders from './components/SellerOrders';
import MembershipProtectedRoute from './components/MembershipProtectedRoute';
import Layout from './components/Layout'; // Import Layout for global logout
import Checkout from './components/checkout';

import './Stylings/App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 

  // NEW: cartItems state for Checkout page
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token in App.jsx:", token);
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

        {/* Wrap all protected routes with Layout for global Logout button */}
        <Route element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HomePage /></ProtectedRoute>} />
          <Route path="/trainer" element={<ProtectedRoute isLoggedIn={isLoggedIn}><TrainerMain /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CommunityPage /></ProtectedRoute>} />
          <Route path="/workout" element={<ProtectedRoute isLoggedIn={isLoggedIn}><WorkoutPage /></ProtectedRoute>} />
          <Route path="/video-tutorials" element={<ProtectedRoute isLoggedIn={isLoggedIn}><VideoTutorials /></ProtectedRoute>} />
          <Route path="/video/:id" element={<VideoDetail />} />

          {/* NEW Checkout Route */}
          <Route path="/checkout" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Checkout cartItems={cartItems} /></ProtectedRoute>} />

          {/* Trainer Routes */}
          <Route path="/trainer/male" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MaleTrainers /></ProtectedRoute>} />
          <Route path="/trainer/female" element={<ProtectedRoute isLoggedIn={isLoggedIn}><FemaleTrainers /></ProtectedRoute>} />
          <Route path="/register-trainer" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MembershipProtectedRoute><RegisterTrainer /></MembershipProtectedRoute></ProtectedRoute>} />
          <Route path="/hire-trainer/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HireTrainer /></ProtectedRoute>} />
          <Route path="/trainer-receipt" element={<TrainerReceipt />} />

          <Route path="/enlist-fitness-product" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MembershipProtectedRoute><EnlistFitnessProduct /></MembershipProtectedRoute></ProtectedRoute>} />
          <Route path="/product" element={<ProtectedRoute isLoggedIn={isLoggedIn}><FitnessProduct /></ProtectedRoute>} />
          <Route path="/fitness-cart" element={<ProtectedRoute isLoggedIn={isLoggedIn}><FitnessCart /></ProtectedRoute>} />
          <Route path="/edit-product/:id" element={<EditFitnessProduct />} />

          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/ChatApp" element={<ChatApp />} />
          {isAdmin && <Route path="/admin" element={<AdminPanel />} />}
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/seller-orders" element={<SellerOrders />} />
        </Route>
      </Routes>

      {shouldShowNavbar && <Footer />}
    </>
  );
};

export default App;
