import React from 'react';
import '../Stylings/Contact.css'; // Adjust the path as necessary


const Contact = () => {
  return (
     <div>
       
      {/* Contact Hero Section */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We would love to hear from you! Reach out with any questions or feedback.</p>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <h2>Get in Touch</h2>
        <form action="#" method="post">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="6" required></textarea>

          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info">
        <h2>Our Information</h2>
        <p>
          <strong>Email:</strong> support@FitnessHub.com
        </p>
        <p>
          <strong>Phone:</strong> (123) 456-7890
        </p>
        <p>
          <strong>Address:</strong> 123 E-commerce St, Shopping City, SC 12345
        </p>
      </section>

       {/* Footer */}
       <footer className="footer">
            <p>Fitness Hub - Your Partner in Health and Wellness</p>
        <p>&copy; {new Date().getFullYear()} Fitness Hub. All Rights Reserved.</p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> |
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a> |
          <a href="/terms-of-service">Terms of Service</a> |
          <a href="/contact-us">Contact Us</a>
        </div>
        <p>Contact Us: <a href="mailto:info@fitnesshub.com">info@fitnesshub.com</a></p>
      </footer>
    </div>
  );
};

export default Contact;
