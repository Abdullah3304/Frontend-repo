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
        <form action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="0c872cb9-6c0e-4848-90f9-55f5b7f200df"></input>

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
    </div>
  );
};

export default Contact;
