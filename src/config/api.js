// API Configuration
// Use environment variable if available, otherwise default to localhost
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

// Remove /api suffix for base URL (used for image paths)
const BASE_URL = API_BASE_URL.replace('/api', '');

// Helper function to get API URL (for backwards compatibility)
export const getApiUrl = (endpoint = '') => {
  return endpoint ? `${API_BASE_URL}${endpoint}` : API_BASE_URL;
};

export { API_BASE_URL, BASE_URL };


