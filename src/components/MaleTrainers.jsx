import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainerCard from './TrainerCard';
import '../Stylings/MaleTrainers.css';
import maleHero from '../assets/male.png';
import { API_BASE_URL } from '../config/api';

const MaleTrainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSpecs, setSelectedSpecs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All Types');
    const [priceRange, setPriceRange] = useState(10000);
    const cardsPerPage = 6;
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios.get(`${API_BASE_URL}/trainers/male`, {
                params: {
                    token: token
                }
            })
            .then((res) => setTrainers(res.data))
            .catch((err) => console.error(err));
        }
    }, []);

    const handleSpecChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedSpecs([...selectedSpecs, value]);
        } else {
            setSelectedSpecs(selectedSpecs.filter((spec) => spec !== value));
        }
        setCurrentPage(1); // Reset to page 1 on filter change
    };

    // ✅ Apply ALL filters: Specialization, Name, Type
    const filteredTrainers = trainers.filter((trainer) => {
        const specializationArray = Array.isArray(trainer.specialization)
            ? trainer.specialization
            : [trainer.specialization || ''];

        const matchesSpec =
            selectedSpecs.length === 0 ||
            specializationArray.some(spec => selectedSpecs.includes(spec));


        const matchesName =
            trainer.name?.toLowerCase().includes(searchTerm);

        const matchesType =
            selectedType === 'All Types' ||
            (selectedType === 'Both'
                ? ['online', 'physical'].includes(trainer.availability?.toLowerCase())
                : trainer.availability?.toLowerCase() === selectedType.toLowerCase());

        const matchesPrice = trainer.price <= priceRange;
        return matchesSpec && matchesName && matchesType && matchesPrice;
    });

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredTrainers.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(filteredTrainers.length / cardsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setCurrentPage(1);
    };

    const handlePriceChange = (e) => {
        setPriceRange(Number(e.target.value));
        setCurrentPage(1);
    };



    return (
        <div className="male-trainers-page">
            {/* Hero Section */}
            <div
                className="hero-section"
                style={{
                    backgroundImage: `url(${maleHero})`,
                }}
            >

            </div>

            {/* Content Section */}
            <div className="content-container">
                {/* Sidebar Filters */}
                <aside className="sidebar">
                    <h3>Filter Options</h3>
                    <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange} />
                    {/* Specialization Checkboxes */}
                    <div className="specialization-checkboxes">
                        <p>Specializations</p>
                        {['Yoga', 'CrossFit', 'Cardio', 'Bodybuilding', 'HIIT', 'Zumba'].map((spec) => (
                            <label key={spec} style={{ display: 'block', marginBottom: '5px' }}>
                                <input
                                    type="checkbox"
                                    value={spec}
                                    checked={selectedSpecs.includes(spec)}
                                    onChange={handleSpecChange}
                                />{' '}
                                {spec}
                            </label>
                        ))}
                    </div>
                    <select value={selectedType} onChange={handleTypeChange}>
                        <option>All Types</option>
                        <option>Online</option>
                        <option>Physical</option>
                        <option>Both</option>
                    </select>
                    <p>Price Range Up to ${priceRange}</p>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange}
                        onChange={handlePriceChange}
                    />

                </aside>

                {/* Cards Display */}
                <div className="trainer-cards">
                    {currentCards.length === 0 ? (
                        <div className="no-trainers-message">
                            No trainers found matching your criteria.
                        </div>
                    ) : (
                        <>
                            {currentCards.map((trainer) => (
                                <TrainerCard key={trainer._id} trainer={trainer} />
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

export default MaleTrainers;
