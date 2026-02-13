import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { API_BASE_URL, BASE_URL } from '../config/api';

const MembershipProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // 🔥 read token directly
  const [loading, setLoading] = useState(true);
  const [hasMembership, setHasMembership] = useState(false);

  useEffect(() => {
    const checkMembership = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/check-membership', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.isActive) {
            setHasMembership(true);
          }
        }
      } catch (err) {
        console.error('Membership check failed:', err);
      }

      setLoading(false);
    };

    checkMembership();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (!hasMembership) return <Navigate to="/join-us" replace />;

  return children;
};

export default MembershipProtectedRoute;
