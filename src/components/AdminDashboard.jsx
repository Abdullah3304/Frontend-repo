import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Stylings/Admin.css'; // Link to your CSS file

const AdminDashboard = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // For update functionality
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0],
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert('Product added successfully');
      setProducts((prevProducts) => [...prevProducts, response.data.product]);
      setProduct({ name: '', description: '', price: '', image: null }); // Reset form
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditingProductId(product._id);
    setProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null, // Leave the image field empty initially for updates
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/products/${editingProductId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert('Product updated successfully');
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p._id === editingProductId ? response.data.product : p))
      );
      setIsEditing(false);
      setProduct({ name: '', description: '', price: '', image: null }); // Reset form
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
      <form className="product-form" onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}>
        <label htmlFor="name">Title</label>
        <input
          id="name"
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          required
        ></textarea>
        
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          required
        />
        
        <label htmlFor="image">Upload Image</label>
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        
        <button type="submit" className="submit-btn">
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
        {isEditing && (
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        )}
      </form>

      <h2>Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ul className="product-list">
          {products && products.length > 0 ? (
            products.map((product) => (
              <li key={product._id} className="product-item">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} />
                <button onClick={() => handleEditProduct(product)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn">
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
