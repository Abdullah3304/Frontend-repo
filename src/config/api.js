// API Configuration
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

// Remove /api suffix if it exists for base URL (for image paths)
const BASE_URL = API_BASE_URL.replace('/api', '');

export { API_BASE_URL, BASE_URL };

