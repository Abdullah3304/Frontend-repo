import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylings/About.css';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>
          At Flex Fuel, we are passionate about empowering individuals to achieve their fitness goals
          and live healthier lives.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Join Us!</h2>
        <p>
          Join our community today and take the first step towards a healthier, stronger you! 💪
        </p>
        <Link to="/join-us" className="btn">
          Subscribe Now
        </Link>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <h3>Abdullah Tariq</h3>
          </div>
          <div className="team-member">
            <h3>Bilal Nadeem</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
