import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login-signup" />; // Redirect to login/signup page if not authenticated
  }
  return children;
};

export default AuthWrapper;
  