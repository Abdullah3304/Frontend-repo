import { Link } from 'react-router-dom';
import '../Stylings/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            {/* ABOUT US */}
            <div className="footer-section">
                <h3>ABOUT US</h3>
                <ul>
                    <li><Link to="/about">About Page</Link></li>
                    <li><Link to="/contact">Contact Page</Link></li>
                    <li>Email: <span>FitnessHub4116@gmail.com</span></li>
                </ul>
            </div>

            {/* QUICK LINKS */}
            <div className="footer-section">
                <h3>QUICK LINKS</h3>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/faqs">FAQs</Link></li>
                </ul>
            </div>

            {/* CUSTOMER AREA */}
            <div className="footer-section">
                <h3>CUSTOMER AREA</h3>
                <ul>
                    <li><Link to="/community">Community</Link></li>
                    <li><Link to="/cart">Shopping Cart</Link></li>
                    <li><Link to="/checkout">Checkout</Link></li>
                </ul>
            </div>

            
            {/* FOLLOW US */}
            <div className="footer-section follow-us">
                <h3>FOLLOW US</h3>
                <div className="social-links">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">YouTube</a>
                </div>
            </div>

            {/* SUBSCRIBE TO FITNESS */}
            <div className="footer-subscribe">
                <h3>SUBSCRIBE TO FITNESS</h3>
                <p>Unlock exclusive benefits and personalized fitness plans with our membership.</p>
                <Link to="/join-us">
                    <button className="subscribe-btn">Subscribe</button>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
