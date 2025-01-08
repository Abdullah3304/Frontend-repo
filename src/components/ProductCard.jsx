import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="product-image"
      />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductCard;
