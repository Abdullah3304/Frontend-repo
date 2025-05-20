import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylings/About.css'; // Adjust the path to your CSS file if necessary

const About = () => {
  const handleSubscribe = () => {
    // Handle subscribe action here, e.g., open a modal, submit a form, etc.
    // Redirect to Join Us page when clicking "Subscribe Now"
    window.location.href = '/joinus';
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>
          At Fitness Hub, we are passionate about empowering individuals to achieve their fitness goals and live healthier lives.
          Our platform is designed to provide personalized fitness guidance, a vibrant community, and accessible resources for
          everyone, regardless of their fitness level.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Empower Users: We believe that fitness is for everyone. Our mission is to provide tailored resources that guide users
          on their unique fitness journeys.
        </p>
        <p>
          Create Community: We strive to foster a supportive environment where users can connect, share experiences, and motivate
          each other.
        </p>
        <p>
          Promote Accessibility: Fitness should be accessible to all. That’s why we offer various resources, including workout
          logs, video tutorials, and expert advice.
        </p>
      </section>

      {/* What We Offer Section */}
      <section className="offer">
        <h2>What We Offer</h2>
        <p>
          Personalized Fitness Programs: Using innovative AI technology, we offer customized workout plans based on individual
          goals and fitness levels.
        </p>
        <p>
          Trainers and Fitness Experts: Our network of certified trainers provides guidance and support to help users stay on
          track and achieve their goals.
        </p>
        <p>
          Engaging Community Features: Join discussions, share progress, and participate in challenges with fellow fitness
          enthusiasts on our community page.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="values">
        <h2>Our Values</h2>
        <p><strong>Integrity:</strong> We are committed to providing accurate information and reliable fitness resources.</p>
        <p><strong>Inclusivity:</strong> We welcome everyone, regardless of age, background, or fitness level. Your journey is
          important to us!</p>
        <p><strong>Innovation:</strong> We consistently update our features and incorporate the latest fitness trends to enhance
          the user experience.</p>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Join Us!</h2>
        <p>
          No matter where you are in your fitness journey, Fitness Hub is here to help you every step of the way. Join our
          community today and take the first step towards a healthier, stronger you! 💪
        </p>
        <button className="btn" onClick={handleSubscribe}>
          Subscribe Now
        </button>
      </section>

      {/* Meet the Team Section */}
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Muhammad Hassan Farooq" />
            <h3>Muhammad Hassan Farooq</h3>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Abdullah Rashid" />
            <h3>Abdullah Rashid</h3>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Zain" />
            <h3>Zain</h3>
          </div>
        </div>
      </section>

    {/* Footer */}
    <footer className="footer">
    <p>Fitness Hub - Your Partner in Health and Wellness</p>
        <p>&copy; 2024 Fitness Hub. All Rights Reserved.</p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>{' '}
          |{' '}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>{' '}
          |{' '}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </footer> 
    </div>
  );
};

export default About;
