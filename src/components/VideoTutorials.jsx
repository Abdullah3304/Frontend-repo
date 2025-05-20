import React from 'react';
import '../Stylings/VideoTutorials.css'; // Make sure to update the path

const VideoTutorials = () => {
  const videos = [
    { id: 1, title: "Basic Strength Training", description: "This is a strength training video for beginners.", isPremium: false, image: '1' },
    { id: 2, title: "Cardiopulmonary Endurance Training", description: "A video to improve cardiopulmonary endurance", isPremium: true, image: '2' },
    { id: 3, title: "Flexibility Training", description: "Stretching exercises to help you increase flexibility.", isPremium: false, image: '3' },
    // Add other video data...
  ];

  const scrollLeft = () => {
    const videoList = document.querySelector('.video-list');
    videoList.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const videoList = document.querySelector('.video-list');
    videoList.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="video-tutorials">
      <h1>Video Tutorials</h1>
      <div className="video-list">
        {videos.map(video => (
          <div key={video.id} className="video-card" data-image={video.image}>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            {video.isPremium ? (
              <p>Premium content (subscription required)</p>
            ) : (
              <p>Free content</p>
            )}
            <button onClick={() => alert('Functionality not implemented yet.')}>
              Watch Video
            </button>
          </div>
        ))}
      </div>
      <div className="arrow arrow-left" onClick={scrollLeft}>❰</div>
      <div className="arrow arrow-right" onClick={scrollRight}>❱</div>
    </div>
  );
};

export default VideoTutorials;
