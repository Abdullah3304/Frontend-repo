// components/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Stylings/AdminPanel.css';

const AdminPanel = () => {
    const [trainers, setTrainers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchTrainers();
        fetchProducts();
    }, []);

    const fetchTrainers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/trainers');
            setTrainers(data);
        } catch (err) {
            console.error('Failed to fetch trainers:', err.message);
        }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/fitness-products');
            setProducts(data);
        } catch (err) {
            console.error('Failed to fetch products:', err.message);
        }
    };

    const deleteTrainer = async (id) => {
        if (!window.confirm('Delete this trainer?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/trainers/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTrainers(prev => prev.filter(t => t._id !== id));
            alert('Trainer deleted');
        } catch (err) {
            alert('Failed to delete trainer');
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Delete this product?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/fitness-products/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(prev => prev.filter(p => p._id !== id));
            alert('Product deleted');
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>

            <section>
                <h2>All Trainers</h2>
                {trainers.length === 0 ? (
                    <p>No trainers found.</p>
                ) : (
                    <ul>
                        {trainers.map(trainer => (
                            <li key={trainer._id}>
                                <p><strong>{trainer.name}</strong> - {trainer.specialization}</p>
                                <button onClick={() => deleteTrainer(trainer._id)}>Delete Trainer</button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2>All Products</h2>
                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <ul>
                        {products.map(product => (
                            <li key={product._id}>
                                <p><strong>{product.name}</strong> - ${product.price}</p>
                                <button onClick={() => deleteProduct(product._id)}>Delete Product</button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default AdminPanel;
