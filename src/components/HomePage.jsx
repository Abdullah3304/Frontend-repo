import React from 'react';
import '../Stylings/HomePage.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopMate</h1>
          <p>Your one-stop shop for all your needs!</p>
          <a href="/products" className="btn primary-btn">Shop Now</a>
        </div>
      </section>


      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          {/* Add your featured products here */}
          <div className="product-card">
            <img src="https://static3.webx.pk/files/4012/Images/ezgif.com-webp-to-jpg-7-4012-1720561-250223094320178.jpg" alt="Product 1" />
            <h3>D link Wifi Router</h3>
            <p>$30</p>
            <a href="/products" className="btn">View Product</a>
          </div>
          <div className="product-card">
            <img src="https://okstraders.com/wp-content/uploads/2024/11/808cbc4cd8e22cb859e6eaaa668f3251.jpg_720x720q80.jpg_.webp" alt="Product 2" />
            <h3>OKS D20 Watch</h3>
            <p>$10</p>
            <a href="/products" className="btn">View Product</a>
          </div>
          <div className="product-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHescUBYriZqb6gcl7pVE19QQOZuuO6XMExQ&s" alt="Product 3" />
            <h3>Iphone Adapter</h3>
            <p>$7</p>
            <a href="/products" className="btn">View Product</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 ShopMate. All Rights Reserved.</p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          |
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          |
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
