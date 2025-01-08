import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Stylings/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isProductInCart = cart.some((item) => item._id === product._id);
    if (isProductInCart) {
      return;
    }
    const newCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(newCart));

    setAlertMessage(`${product.name} has been added to the cart!`);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 5000);
  };

  return (
    <div>
      {showPopup && (
        <div className="alert-popup">
          <p>{alertMessage}</p>
        </div>
      )}

      <section className="hero">
        <h1>Discover Our Products</h1>
        <p>Find high-quality items to suit your lifestyle</p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>

        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">
          <strong>Price: </strong> 
          <span>${product.price}</span>
        </p>
                <button className="btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>

              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>

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
}

export default Products;
