import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FitnessProductCard from './FitnessProductCard';
import '../Stylings/MaleTrainers.css'; // Reuse existing styling for layout
import productHero from '../assets/shop.png'; 
import { API_BASE_URL, BASE_URL } from '../config/api';

const FitnessProduct = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState(10000);
    const cardsPerPage = 6;

    useEffect(() => {
        axios.get(`${API_BASE_URL}/fitness-products') 
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedCategories([...selectedCategories, value]);
        } else {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
        }
        setCurrentPage(1);
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.type);

        const matchesName =
            product.name?.toLowerCase().includes(searchTerm);

        const matchesPrice = Number(product.price) <= priceRange;

        return matchesCategory && matchesName && matchesPrice;
    });

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredProducts.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(filteredProducts.length / cardsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const handlePriceChange = (e) => {
        setPriceRange(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSearchTerm('');
        setPriceRange(10000);
        setCurrentPage(1);
    };

    const handleDelete = (productId) => {
        // Don't call API again here — just update UI
        setProducts(prevProducts =>
            prevProducts.filter(product => product._id !== productId)
        );
    };


    return (
        <div className="male-trainers-page">
            {/* Hero Section */}
            <div
                className="hero-section"
                style={{
                    backgroundImage: `url(${productHero})`,
                }}
            />

            {/* Content Section */}
            <div className="content-container">
                {/* Sidebar Filters */}
                <aside className="sidebar">
                    <h3>Filter Options</h3>
                    <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange} />

                    <div className="specialization-checkboxes">
                        <p>Categories</p>
                        {[
                            'Fitness Equipment',
                            'Fitness Apparel',
                            'Supplements & Nutrition',
                            'Gym Accessories',
                            'Tech & Wearables',
                            'Fitness Resources',
                            'Health & Hygiene'
                        ].map((cat) => (
                            <label key={cat} style={{ display: 'block', marginBottom: '5px' }}>
                                <input
                                    type="checkbox"
                                    value={cat}
                                    checked={selectedCategories.includes(cat)}
                                    onChange={handleCategoryChange}
                                />{' '}
                                {cat}
                            </label>
                        ))}
                    </div>


                    <p>Price Range Up to ${priceRange}</p>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange}
                        onChange={handlePriceChange}
                    />

                    <button onClick={handleClearFilters} style={{ marginTop: '10px' }}>
                        Clear All Filters
                    </button>
                </aside>

                {/* Cards Display */}
                <div className="trainer-cards">
                    {currentCards.length === 0 ? (
                        <div className="no-trainers-message">
                            No products found matching your criteria.
                        </div>
                    ) : (
                        <>
                            {currentCards.map((product) => (
                                <FitnessProductCard
                                    key={product._id}
                                    product={product}
                                    onDelete={handleDelete} />
                            ))}
                            {totalPages > 1 && (
                                <div className="pagination">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={currentPage === i + 1 ? 'active' : ''}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FitnessProduct;
