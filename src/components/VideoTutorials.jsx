"use client"

import "../Stylings/VideoTutorials.css"
import { useNavigate } from "react-router-dom"

const VideoTutorials = () => {
  const navigate = useNavigate()

  const videos = [
    {
      id: 1,
      title: "Basic Strength Training",
      description: "This is a strength training video for beginners.",
      thumbnail: "/images/BasicStrengthTraining.jpg",
    },
    {
      id: 2,
      title: "Cardiopulmonary Endurance Training",
      description: "A video to improve cardiopulmonary endurance",
      thumbnail: "/images/Cardiopulmonaryendurancetraining.jpg",
    },
    {
      id: 3,
      title: "Flexibility Training",
      description: "Stretching exercises to help you increase flexibility.",
      thumbnail: "/images/Flexibilitytraining.jpg",
    },
    {
      id: 4,
      title: "Mobility Training",
      description: "Here's a video to help you improve your joint mobility.",
      thumbnail: "/images/MobilityTraining.jpg",
    },
    {
      id: 5,
      title: "Biceps",
      description: "Here's a video to help you strengthen your biceps.",
      thumbnail: "/images/Biceps.jpg",
    },
    {
      id: 6,
      title: "Triceps",
      description: "Here's a video to help you improve triceps mobility.",
      thumbnail: "/images/Triceps.jpg",
    },
    {
      id: 7,
      title: "Legs",
      description: "Here's a video to help you strengthen your leg muscles.",
      thumbnail: "/images/Legs.jpg",
    },
    {
      id: 8,
      title: "Back",
      description: "Here is a video to help you strengthen your back muscles.",
      thumbnail: "/images/Back.jpg",
    },
    {
      id: 9,
      title: "Chest",
      description: "Here is a video to help you strengthen your chest muscles.",
      thumbnail: "/images/Chest.jpg",
    },
    {
      id: 10,
      title: "Shoulder",
      description: "Here's a helpful video for shoulder stretches.",
      thumbnail: "/images/Shoulder.jpg",
    },
    {
      id: 11,
      title: "Forearms",
      description: "Here's a video to help you improve elbow and wrist mobility.",
      thumbnail: "/images/Forearms.jpg",
    },
  ]

// ADD THESE SCROLL FUNCTIONS
  const scrollLeft = () => {
    const videoList = document.querySelector(".video-list")
    if (videoList) {
      videoList.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    const videoList = document.querySelector(".video-list")
    if (videoList) {
      videoList.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handleVideoClick = (video) => {
    navigate(`/video/${video.id}`)
  }

  return (
    <div className="video-tutorials">
      <h1>Video Tutorials</h1>
      <div className="video-list">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-card"
            style={{
              backgroundImage: `url(${video.thumbnail})`,
            }}
          >
            <div className="video-card-content">
              <h2>{video.title}</h2>
              <p>{video.description}</p>
              <button onClick={() => handleVideoClick(video)} className="watch-button">
                Watch Videos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD THESE ARROW DIVS HERE */}
      <div className="arrow arrow-left" onClick={scrollLeft}>❰</div>
      <div className="arrow arrow-right" onClick={scrollRight}>❱</div>
    </div>
  )
}

export default VideoTutorials