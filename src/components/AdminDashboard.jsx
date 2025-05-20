import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Stylings/Admin.css';

const AdminDashboard = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const token = localStorage.getItem('token');
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (product.image && product.image instanceof File) {
      formData.append('image', product.image);
    }

    const endpoint = isEditing
      ? `http://localhost:5000/api/products/${editingProductId}`
      : 'http://localhost:5000/api/products';

    const method = isEditing ? axios.put : axios.post;

    try {
      const response = await method(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const updatedProduct = response.data.product;

      if (isEditing) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProductId ? updatedProduct : p))
        );
        alert('Product updated successfully');
      } else {
        setProducts((prev) => [...prev, updatedProduct]);
        alert('Product added successfully');
      }

      setProduct({ name: '', description: '', price: '', image: null });
      setIsEditing(false);
      setEditingProductId(null);
    } catch (error) {
      console.error('Failed to submit product:', error);
      alert('There was an error saving the product.');
    }
  };

  const handleEditProduct = (prod) => {
    setIsEditing(true);
    setEditingProductId(prod._id);
    setProduct({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      image: null, // Keep this null unless a new image is selected
    });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };
  //------adding this so i dont face problem like when i register it dosent because it says it is unauthorize but when i logout and login it work so to prevent it we are using this
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in as admin first.');
    return;
  }

  return (
    <div className="admin-dashboard">
      <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          required
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          required
        />

        <label>Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit" className="submit-btn">
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
        {isEditing && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setIsEditing(false);
              setProduct({ name: '', description: '', price: '', image: null });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ul className="product-list">
          {products.length > 0 ? (
            products.map((p) => (
              <li key={p._id} className="product-item">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p>${p.price}</p>
                {p.image && (
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                    className="trainer-image"
                  />
                )}
                <button onClick={() => handleEditProduct(p)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDeleteProduct(p._id)} className="delete-btn">
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
