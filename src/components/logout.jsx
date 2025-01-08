import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    navigate('/'); // Redirect to login/signup page
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
