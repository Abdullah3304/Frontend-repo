import React from 'react';
import { Link } from 'react-router-dom'; // Add this at the top
import '../Stylings/HomePage.css';
import whatWeOfferImg from '../assets/what we offer.png';
import homeHero from '../assets/home.jpg';
import trainerHubImg from '../assets/trainer hub.png';
import communityImage from '../assets/Community.png';
import ShopImage from '../assets/Shop.jpg';

const Home = ({ userName }) => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${homeHero})` }}
      >
        <div className="hero-content">
          <h1>Welcome {userName ? userName : "to Fitness Hub"}</h1>
          <p>DON'T STOP WHEN IT HURTS, STOP WHEN YOU'RE DONE!</p>
          <Link to="/join-us" className="btn primary-btn">Join Now</Link>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="what-we-offer">
        <div className="offer-text">
          <h2>What We Offer</h2>
          <p>Your fitness journey starts here! Explore our Trainer Hub, Shop, Community, and Premium Membership options to take your fitness to the next level.</p>
          <div className="offer-buttons">
            <a href="/workout" className="btn">Start Tracking Your Workout</a>
            <a href="/trainer" className="btn">Find a Trainer</a>
          </div>
        </div>
        <div className="offer-image">
          <img src={whatWeOfferImg} alt="What We Offer" />
        </div>
      </section>


      {/* Trainer Hub Section */}
      <section className="trainer-hub">
        <div className="trainer-image">
          <img src={trainerHubImg} alt="Trainer Hub" />
        </div>
        <div className="trainer-text">
          <h2>Trainer Hub</h2>
          <p>
            Take your fitness journey to the next level with our Trainer Hub. <br /><br />
            🏋️ Log your daily workouts and track your progress. <br />
            👨‍🏫 Hire expert trainers who match your goals. <br />
            🧍 Become a certified trainer and grow your reach. <br />
            🎥 Access exclusive workout videos anytime, anywhere. <br /><br />
            Whether you're a beginner or a pro, Trainer Hub gives you the tools to succeed.
          </p>
        </div>
      </section>
      {/* Explore the Shop*/}
      <section className="shop-hub">
        <div className="shop-content">
          <h2>Explore Our Fitness Store</h2>
          <p>
            Browse a wide range of premium supplements, gym accessories, apparel, and fitness gadgets carefully curated for all fitness enthusiasts.
          </p>
          <Link to="/products" className="shop-btn">Shop Now</Link>
        </div>
        <div className="shop-image">
          <img src={ShopImage} alt="Fitness Store Preview" />
        </div>
      </section>
      {/* Join Us Section */}
      <section className="join-us-section">
        <h2>Unlock Your Full Potential with Premium Membership!</h2>
        <p>Get exclusive access to expert trainers, personalized workout plans, premium workout videos, and more. Don’t miss out on a tailored fitness journey designed just for you.</p>
        <a href="/Join-us" className="btn">Get Premium Access</a>
      </section>
      {/* Membership Benefits Section */}
      <section className="membership-benefit-section">
        <div className="membership-content">
          <div className="membership-image">
            <img src={require('../assets/mem-trai-sho.png')} alt="Membership Benefits" />
          </div>
          <div className="membership-text">
            <h2>Become a Trainer or Seller</h2>
            <p>
              Unlock exclusive privileges by purchasing a membership! You can register as a <strong>Trainer</strong> to guide others or a <strong>Seller</strong> to offer fitness-related products.
            </p>
            <Link to="/join-us" className="btn">Buy Membership</Link>
          </div>
        </div>
      </section>
      {/* Chatbot Section */}
      <section className="chatbot-section">
        <div className="chatbot-content">
          <div className="chatbot-text">
            <h2>Your Personal AI Fitness Chatbot</h2>
            <p>
              Have questions about workouts, nutrition, or recovery? Our AI chatbot is available 24/7 to guide you on your fitness journey.
            </p>
            <Link to="/chatbot" className="btn">Ask the AI Now</Link>
          </div>
          <div className="chatbot-image">
            <img src={require('../assets/chatbot.png')} alt="Fitness Chatbot" />
          </div>
        </div>
      </section>

     

      {/* Community Showcase Section */}
      <section className="community-showcase">
        <div className="community-text">
          <h3>Join the Community</h3>
          <p>Stay motivated by joining discussions and sharing your progress.</p>
          <a href="/community" className="btn">Explore Community</a>
        </div>
        <div className="community-image">
          <img src={communityImage} alt="Community" />
        </div>
      </section>

    </div>
  );
};

export default Home;
