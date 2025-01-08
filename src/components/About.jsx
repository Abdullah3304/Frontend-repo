import React from 'react';
import '../Stylings/About.css'; // Adjust the path to your CSS file if necessary


const About = () => {
  const handleSubscribe = () => {
    // Handle subscribe action here, e.g., open a modal, submit a form, etc.
    alert("Subscription action triggered");
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Discover who we are and what drives us to bring you quality products.</p>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At ShopMate, our mission is to provide top-quality products with an emphasis on customer satisfaction. We strive to build a community of shoppers
          who value quality and affordability.
        </p>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" />
            <h3>Abdullah Tariq</h3>
            <p>Developer</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" />
            <h3>Bilal Nadeem</h3>
            <p>Head of Marketing</p>
          </div>
         
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Join Our Community</h2>
        <p>Sign up for our newsletter to get the latest updates and offers.</p>
        {/* Changed the <a> to a <button> for accessibility */}
        <button className="btn" onClick={handleSubscribe}>
          Subscribe Now
        </button>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 ShopMate. All Rights Reserved.</p>
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
