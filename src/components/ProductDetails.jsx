import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';  // Import the ProductCard component

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data); // Set the product data
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  console.log("<<<<<<<<<DETAILS PAGE", product)
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={`http://localhost:5000/${product.image}`} alt={product.name} />

      {/* You can display the product details in a card format too */}
      <div>
        <h2>Product Overview</h2>
        <ProductCard product={product} /> {/* Pass the product to ProductCard */}
      </div>
    </div>
  );
};

export default ProductDetails;
