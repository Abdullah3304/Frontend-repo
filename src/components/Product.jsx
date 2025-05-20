import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Stylings/Products.css';
import shopImage from '../assets/shop.png';
import cartIcon from '../assets/cart.png'; // Import the cart icon

function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(1000);
  const cardsPerPage = 6;

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
    let results = products;

    if (searchQuery) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    results = results.filter((product) => product.price <= priceRange);

    setFilteredProducts(results);
    setCurrentPage(1); // Reset to first page on new filter
  }, [searchQuery, priceRange, products]);

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

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {showPopup && (
        <div className="alert-popup">
          <p>{alertMessage}</p>
        </div>
      )}

      <section className="hero">
        <div className="hero-image-container">
          <img src={shopImage} alt="Shop" className="hero-shop-image" />
        </div>
      </section>

      <div className="content-layout">
        {/* ✅ Filter Sidebar */}
        <aside className="filter-container">
          <h3>Filter Products</h3>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar"
            />
          </div>

          <p>Price Range: Up to ${priceRange}</p>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />
        </aside>

        <div className="product-list-section">
          {/* Cart Icon */}
          <Link to="/cart" className="cart-icon-link">
            <img src={cartIcon} alt="Cart" className="cart-icon" />
          </Link>

          <div className="product-list">
            {currentCards.length > 0 ? (
              currentCards.map((product) => (
                <div key={product._id} className="product-card">
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                    className="trainer-image"
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

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
