import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, BASE_URL } from '../config/api';

function TestBackend() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL below with your backend API endpoint
        const response = await axios.get(`${API_BASE_URL}/test');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error connecting to the backend:', error);
        setMessage('Failed to connect to the backend.');
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Backend Test</h1>
      <p>{message || 'Loading...'}</p>
    </div>
  );
}

export default TestBackend;
