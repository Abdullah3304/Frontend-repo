import axios from './axios'; // Adjust path based on where `axios.js` is stored

const registerUser = async (userData) => {
  try {
    const response = await axios.post('/users/register', userData);
    console.log('User registered successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default registerUser;
