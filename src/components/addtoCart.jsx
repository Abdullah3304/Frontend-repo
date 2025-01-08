import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]); // State for products

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Fetch all products
        setProducts(response.data); // Set the products in the state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle adding a product to the cart
  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Ensure user is authenticated
      if (!token) {
        window.location.href = '/login'; // Redirect to login if not authenticated
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/cart',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data.message);
      alert("Product added to cart successfully!");
    } catch (error) {
      if (error.response) {
        console.error('Error adding to cart:', error.response.data);
        alert(error.response.data.error || 'An error occurred while adding to cart.');
      } else {
        console.error('Error adding to cart:', error.message);
        alert('Unable to connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div className="product-list">
      <div className="products">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            <p><strong>Category:</strong> {product.category}</p>
            <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
