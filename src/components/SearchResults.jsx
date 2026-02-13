import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../Stylings/SearchResults.css'; // Adjust the path as necessary
import { API_BASE_URL, BASE_URL } from '../config/api';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(useLocation().search).get('q'); // Get search query from URL

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products/search?q=${query}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Unable to fetch search results. Please try again.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <div>Loading search results...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="search-results">
      <h1>Search Results for "{query}"</h1>
      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <img
                src={product.imageUrl || 'https://via.placeholder.com/150'}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
