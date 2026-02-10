import React from 'react';
import { Outlet } from 'react-router-dom';
import LogoutButton from './LogoutButton'; // Import your logout button

const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div>
      {isLoggedIn && <LogoutButton setIsLoggedIn={setIsLoggedIn} />}
      <Outlet /> {/* This renders the child route components */}
    </div>
  );
};

export default Layout;
