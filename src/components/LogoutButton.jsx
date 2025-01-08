import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Stylings/Logoutbutton.css'; // Import CSS for styling

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear the token and cart data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('cart'); // Clear cart from localStorage

    try {
      // Get the user ID from the decoded JWT or localStorage
      const token = localStorage.getItem('token');
      const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
      const userId = decoded ? decoded.id : null;

      if (userId) {
        await fetch('/api/clear-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Optional if you want to validate the user server-side
          },
          body: JSON.stringify({ userId }),
        });
      }
    } catch (error) {
      console.error('Error clearing cart on logout:', error);
    }

    // Set login status to false
    setIsLoggedIn(false);

    // Redirect to the login/signup page after logout
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default LogoutButton;
