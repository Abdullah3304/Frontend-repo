import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Stylings/FitnessProductCard.css';

const FitnessProductCard = ({ product, onDelete }) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isCreator = userInfo && String(product.creator) === String(userInfo.id);


    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const saveToLocalStorage = () => {
        const cart = JSON.parse(localStorage.getItem('fitnessCart')) || [];
        const existingIndex = cart.findIndex(item => item._id === product._id);

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('fitnessCart', JSON.stringify(cart));
    };

    const handleAddToCart = () => {
        saveToLocalStorage();
        alert(`${quantity} item(s) added to cart!`);
        setQuantity(1);
    };

    const handleBuyNow = () => {
        saveToLocalStorage();
        navigate('/fitness-cart');
    };
    const handleEdit = () => {
        navigate(`/edit-product/${product._id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:5000/api/fitness-products/delete/${product._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || 'Failed to delete');
                }

                alert('Product deleted successfully');
                if (onDelete) onDelete(product._id); // Refresh product list
            } catch (error) {
                console.error('Delete error:', error.message);
                alert('Failed to delete product');
            }
        }
    };

    console.log('product.creator:', product.creator);
    console.log('userInfo._id:', userInfo?.id);

    return (
        <div className="product-card">
            <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="product-image"
            />
            <div className="product-details">
                <h2>{product.name}</h2>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Type:</strong> {product.type}</p>


                {!isCreator && (
                    <div className="quantity-control">
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                )}

                <div className="product-buttons">
                    {isCreator ? (
                        <>
                            <button className="btn edit-btn" onClick={handleEdit}>
                                Edit
                            </button>
                            <button className="btn delete-btn" onClick={handleDelete}>
                                Remove
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn add-to-cart" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                            <button className="btn buy-now" onClick={handleBuyNow}>
                                Buy Now
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FitnessProductCard;