import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Stylings/EditFitnessProduct.css'

const EditFitnessProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        type: '',
        image: '',
        imageFile: null,  // file selected by user
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/fitness-products/${id}`);
                const data = res.data;
                setProduct(prev => ({
                    ...prev,
                    name: data.name || '',
                    description: data.description || '',
                    price: data.price || '',
                    type: data.type || '',
                    image: data.image || '',
                    imageFile: null, // No file yet
                }));
            } catch (err) {
                console.error('Failed to fetch product:', err);
                alert('Failed to load product.');
                navigate('/product');
            }
        };

        fetchProduct();
    }, [id, navigate]);


    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('type', product.type);
        if (product.imageFile) {
            formData.append('image', product.imageFile);
        }

        try {
            await axios.put(`http://localhost:5000/api/fitness-products/update/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            alert('Product updated successfully!');
            navigate('/product');
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update product.');
        }
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, imageFile: e.target.files[0] });
    };


    return (
        <div className="edit-product-page">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                />
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <input
                    type="text"
                    name="type"
                    value={product.type}
                    onChange={handleChange}
                    placeholder="Category (e.g., Fitness Apparel)"
                    required
                />
                {product.image && (
                    <img
                        src={`http://localhost:5000/${product.image}`}
                        alt="Current"
                        style={{ maxWidth: '200px', marginBottom: '10px' }}
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default EditFitnessProduct;
