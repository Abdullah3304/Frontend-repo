import React, { useState } from 'react';
import axios from 'axios';
import Enlist from '../assets/Enlist.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../Stylings/RegisterTrainer.css'; // Reuse same styling

const EnlistFitnessProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        type: '',
        description: '',
        price: '',
        gmail: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('name', productData.name);
        formData.append('type', productData.type);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('gmail', productData.gmail);

        if (productData.image && productData.image instanceof File) {
            formData.append('image', productData.image);
        }

        try {
            await axios.post('http://localhost:5000/api/fitness-products/register', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Product enlisted successfully!');
            setProductData({
                name: '',
                type: '',
                description: '',
                price: '',
                gmail: '',
                image: ''
            });
        } catch (error) {
            console.error(error);
            toast.error('There was an error enlisting the product.');
        }
    };

    return (
        <div
            className="register-hero-section"
            style={{
                backgroundImage: `url(${Enlist})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div className="register-overlay">
                <div className="register-content">
                    <form onSubmit={handleSubmit} className="grid-form" style={{ width: '100%' }}>
                        <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" required />
                        <select name="type" value={productData.type} onChange={handleChange} required>
                            <option value="">Select Product Type</option>
                            <option value="Fitness Equipment">Fitness Equipment</option>
                            <option value="Fitness Apparel">Fitness Apparel</option>
                            <option value="Supplements & Nutrition">Supplements & Nutrition</option>
                            <option value="Gym Accessories">Gym Accessories</option>
                            <option value="Tech & Wearables">Tech & Wearables</option>
                            <option value="Fitness Resources">Fitness Resources</option>
                            <option value="Health & Hygiene">Health & Hygiene</option>
                        </select>

                        <input type="email" name="gmail" value={productData.gmail} onChange={handleChange} placeholder="Your Gmail" required />
                        <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" required />
                        <textarea name="description" value={productData.description} onChange={handleChange} placeholder="Product Description" required style={{ gridColumn: '1 / -1' }} />
                        <input type="file" name="image" accept="image/*" onChange={(e) => setProductData({ ...productData, image: e.target.files[0] })} style={{ gridColumn: '1 / -1' }} />

                        <button type="submit" style={{ gridColumn: '1 / -1' }}>Enlist Product</button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default EnlistFitnessProduct;
