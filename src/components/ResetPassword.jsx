import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', { confirm, newPassword, token });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  console.log("<<<<<<<<<>>>>>>>>>>>")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Enter Password to Update</label>
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="New Password"
          />
          <input
            type="text"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Confirm Password"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Reset Password
          </button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
