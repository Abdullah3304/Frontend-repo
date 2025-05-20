import React, { useState } from 'react';
import ThreadCard from './ThreadCard';
import NewThreadForm from './NewThreadForm';
import '../Stylings/Community.css';

const CommunityPage = () => {
  const [threads, setThreads] = useState([
    {
      title: 'Equipment Maintenance Question',
      category: 'Gym Facilities',
      author: 'JohnDoe123',
      time: '3 hours ago',
      content: "Has anyone experienced issues with the treadmill in zone 3? It's making a strange noise...",
    },
    {
      title: 'Best Protein Shakes?',
      category: 'Nutrition',
      author: 'FitnessFanatic',
      time: '5 hours ago',
      content: 'Looking for recommendations for post-workout protein shakes available in the cafe...',
    },
  ]);

  const handleAddThread = (newThread) => {
    setThreads([{
      ...newThread,
      time: 'just now',
    }, ...threads]);
  };

  const handleThreadClick = () => {
    alert('Thread clicked! Implement your detail view logic here.');
  };

  return (
    <div className="community-page">
    <div className="forum-container">
      <div className="forum-header">
        <h1>Community Forum</h1>
      </div>

      <div id="threads-container">
        {threads.map((thread, index) => (
          <ThreadCard 
            key={index}
            thread={thread}
            onClick={handleThreadClick}
          />
        ))}
      </div>

      <NewThreadForm onSubmit={handleAddThread} />
    </div>
    </div>
  );
};

export default CommunityPage;
