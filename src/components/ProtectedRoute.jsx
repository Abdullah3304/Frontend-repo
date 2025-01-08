import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if there's a token in localStorage
  const token = localStorage.getItem('token');

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, allow access to the protected route
  return children;
};

export default ProtectedRoute;
