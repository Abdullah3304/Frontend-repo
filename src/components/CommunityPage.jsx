import React, { useState, useEffect } from 'react';
import ThreadCard from './ThreadCard';
import NewThreadForm from './NewThreadForm';
import '../Stylings/Community.css';

const API_BASE_URL = 'http://localhost:5000/api';

const CommunityPage = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingThread, setEditingThread] = useState(null);

  // Fetch threads from backend
  const fetchThreads = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/threads`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch threads');
      }
      
      const data = await response.json();
      setThreads(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const handleAddThread = async (newThread) => {
    try {
      const response = await fetch(`${API_BASE_URL}/threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newThread),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create thread');
      }
      
      const createdThread = await response.json();
      setThreads([createdThread, ...threads]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditThread = async (threadId, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/threads/${threadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update thread');
      }

      const updatedThread = await response.json();
      setThreads(threads.map(thread => 
        thread._id === threadId ? updatedThread : thread
      ));
      setEditingThread(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleThreadClick = async (threadId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/threads/${threadId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch thread details');
      }
      
      const threadDetails = await response.json();
      setEditingThread(threadDetails);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingThread(null);
  };

  if (loading) return <div className="loading">Loading threads...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="community-page">
      <div className="forum-container">
        <div className="forum-header">
          <h1>Community Forum</h1>
        </div>

        <div id="threads-container">
          {threads.map((thread) => (
            <ThreadCard 
              key={thread._id}
              thread={thread}
              onClick={() => handleThreadClick(thread._id)}
              onEdit={handleEditThread}
              isEditing={editingThread?._id === thread._id}
              onCancelEdit={handleCancelEdit}
            />
          ))}
        </div>

        <NewThreadForm onSubmit={handleAddThread} />
      </div>
    </div>
  );
};

export default CommunityPage;
