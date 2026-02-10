"use client"

import { useParams, Link } from "react-router-dom"
import '../Stylings/VideoDetail.css'

const VideoDetail = () => {
  const { id } = useParams()

  const videoData = [
    {
      id: 1,
      title: "Basic Strength Training",
      description: "This is a strength training video for beginners.",
      urls: [
        "https://www.youtube.com/embed/RPi9aJGuRDM",
        "https://www.youtube.com/embed/1VvgNZsg9nc",
        "https://www.youtube.com/embed/a2e3COofehQ",
      ],
    },
    {
      id: 2,
      title: "Cardiopulmonary Endurance Training",
      description: "A video to improve cardiopulmonary endurance",
      urls: [
        "https://www.youtube.com/embed/cZyHgKtK75A",
        "https://www.youtube.com/embed/at4eL03Edls",
        "https://www.youtube.com/embed/e4ArswB3NEs",
      ],
    },
    {
      id: 3,
      title: "Flexibility Training",
      description: "Stretching exercises to help you increase flexibility.",
      urls: [
        "https://www.youtube.com/embed/FI51zRzgIe4",
        "https://www.youtube.com/embed/L_xrDAtykMI",
        "https://www.youtube.com/embed/CmCysOVh5gA",
      ],
    },
    {
      id: 4,
      title: "Mobility Training",
      description: "Here's a video to help you improve your joint mobility.",
      urls: [
        "https://www.youtube.com/embed/jj2AAH6jbHk",
        "https://www.youtube.com/embed/-OoEXi3vjWE",
        "https://www.youtube.com/embed/TFSYNWPYujQ",
      ],
    },
    {
      id: 5,
      title: "Biceps",
      description: "Here's a video to help you strengthen your biceps.",
      urls: [
        "https://www.youtube.com/embed/z0eulElSJK0",
        "https://www.youtube.com/embed/YcVELcqqVEg",
        "https://www.youtube.com/embed/fSvuZMYyhvg",
      ],
    },
    {
      id: 6,
      title: "Triceps",
      description: "Here's a video to help you improve triceps mobility.",
      urls: [
        "https://www.youtube.com/embed/KzBZ02EAJvE",
        "https://www.youtube.com/embed/JfSee0Q-vRQ",
        "https://www.youtube.com/embed/LowZYOihoC4",
      ],
    },
    {
      id: 7,
      title: "Legs",
      description: "Here's a video to help you strengthen your leg muscles.",
      urls: [
        "https://www.youtube.com/embed/ZZI__bqlBkQ",
        "https://www.youtube.com/embed/IBp9TOCGIJI",
        "https://www.youtube.com/embed/WA23NHfNq-s",
      ],
    },
    {
      id: 8,
      title: "Back",
      description: "Here is a video to help you strengthen your back muscles.",
      urls: [
        "https://www.youtube.com/embed/Sa0sBKUiOvU",
        "https://www.youtube.com/embed/qD-Wy01lfD0",
        "https://www.youtube.com/embed/VAvVpAABrTs",
      ],
    },
    {
      id: 9,
      title: "Chest",
      description: "Here is a video to help you strengthen your chest muscles.",
      urls: [
        "https://www.youtube.com/embed/jBhZWX91bec",
        "https://www.youtube.com/embed/lvk2PMsuS88",
        "https://www.youtube.com/embed/MxnzcssW-tk",
      ],
    },
    {
      id: 10,
      title: "Shoulder",
      description: "Here's a helpful video for shoulder stretches.",
      urls: [
        "https://www.youtube.com/embed/hQrb2gghgd4",
        "https://www.youtube.com/embed/QVaijMZ2mp8",
        "https://www.youtube.com/embed/w8cSjkXkYRc",
      ],
    },
    {
      id: 11,
      title: "Forearms",
      description: "Here's a video to help you improve elbow and wrist mobility.",
      urls: [
        "https://www.youtube.com/embed/CP9n_Hm4FCE",
        "https://www.youtube.com/embed/2HxwBbDb_Yg",
        "https://www.youtube.com/embed/0XS0j1Gtobw",
      ],
    },
  ]

  const video = videoData.find((v) => v.id === Number.parseInt(id))

  if (!video) {
    return (
      <div className="video-detail-container">
        <div className="not-found">
          <h2>Video not found</h2>
          <Link to="/video-tutorials" className="back-link">
            ← Back to Tutorials
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="video-detail-container">
      <div className="video-detail-header">
        <h1>{video.title}</h1>
        <p className="video-description">{video.description}</p>
      </div>

      <div className="video-grid">
        {video.urls.map((url, index) => (
          <div key={index} className="video-wrapper">
            <iframe
              src={url}
              title={`${video.title} ${index + 1}`}
              frameBorder="0"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
        ))}
      </div>

      <div className="video-detail-footer">
        <Link to="/video-tutorials" className="back-link">
          ← Back to Tutorials
        </Link>
      </div>
    </div>
  )
}

export default VideoDetail
