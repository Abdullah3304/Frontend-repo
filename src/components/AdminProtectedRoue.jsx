import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ isAdmin, children }) => {
  // Redirect to login page if not an admin
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // Render children if the user is an admin
  return children;
};

export default AdminProtectedRoute;
