import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18

import App from './App'; // Importing the App component
import './index.css'; // Import your global styles

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use the root to render your App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
