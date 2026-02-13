import React, { useState } from 'react';
import '../Stylings/TrainerCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, BASE_URL } from '../config/api';

const TrainerCard = ({ trainer }) => {
    const [showSlots, setShowSlots] = useState(false);
    const [deleteTrainer, setDeleteTrainer] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: trainer.name,
        gender: trainer.gender,
        specialization: trainer.specialization,
        price: trainer.price,
        availability: trainer.availability,
        gmail: trainer.gmail,
        description: trainer.description,
        onlineClassLink: trainer.onlineClassLink
    });
    const token = localStorage.getItem('token');

    const toggleSlots = () => setShowSlots(!showSlots);

    const handleDelete = () => {
        axios.delete(`${API_BASE_URL}/trainers/delete-trainer/${trainer._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            setDeleteTrainer(true);
            window.location.reload();
        })
        .catch((err) => console.error(err));
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset form data to original values
        setEditFormData({
            name: trainer.name,
            gender: trainer.gender,
            specialization: trainer.specialization,
            price: trainer.price,
            availability: trainer.availability,
            gmail: trainer.gmail,
            description: trainer.description,
            onlineClassLink: trainer.onlineClassLink
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        
        axios.put(`${API_BASE_URL}/trainers/update-trainer/${trainer._id}`, editFormData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            setIsEditing(false);
            window.location.reload();
        })
        .catch((err) => console.error(err));
    }

    if (isEditing) {
        return (
            <div className="trainer-card edit-mode">
                <h2>Edit Trainer</h2>
                <form onSubmit={handleSubmitEdit} className="edit-trainer-form">
                    <div className="form-group"> 
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={editFormData.name} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Gender:</label>
                        <select 
                            name="gender" 
                            value={editFormData.gender} 
                            onChange={handleInputChange} 
                            required
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Specialization:</label>
                        <input 
                            type="text" 
                            name="specialization" 
                            value={editFormData.specialization} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Price ($):</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={editFormData.price} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Availability:</label>
                        <input 
                            type="text" 
                            name="availability" 
                            value={editFormData.availability} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="gmail" 
                            value={editFormData.gmail} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea 
                            name="description" 
                            value={editFormData.description} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Class Location</label>
                        <textarea 
                            name="onlineClassLink" 
                            value={editFormData.onlineClassLink} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    
                    <div className="button-group">
                        <button type="submit" className="btn">Save Changes</button>
                        <button type="button" className="btn cancel" onClick={handleCancelEdit}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="trainer-card">
            <img
                src={`${BASE_URL}/${trainer.image}`}
                alt={trainer.name}
                className="trainer-image"
            />

            <div className="trainer-details">
                <h2>{trainer.name}</h2>
                <p><strong>Gender:</strong> {trainer.gender}</p>
                <p><strong>Specialization:</strong> {trainer.specialization}</p>
                <p><strong>Price:</strong> ${trainer.price}</p>
                <p><strong>Availability:</strong> {trainer.availability}</p>
                <p><strong>Email:</strong> {trainer.gmail}</p>
                <p><strong>Description:</strong> {trainer.description}</p>

                    {!trainer.isCreator &&
                <div className="button-group">
                    <Link to={`/hire-trainer/${trainer._id}`} className="btn">
                        Hire Now
                    </Link>
                </div>}
                <div className="button-group">
                    <button className="toggle-slots-btn" onClick={toggleSlots}>
                        {showSlots ? 'Hide Slots' : 'Show Available Slots'}
                    </button>

                    {trainer?.isCreator && (
                        <>
                            <button className="toggle-slots-btn" onClick={handleEdit}>
                                Edit Trainer
                            </button>

                            <button className="toggle-slots-btn" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                                Delete Trainer
                            </button>
                        </>
                    )}
                </div>

                {showSlots && trainer.availableSlots?.length > 0 && (
                    <div className="slots-container">
                        {trainer.availableSlots.map((slot, index) => (
                            <p key={index}>
                                <strong>{slot.day}:</strong> {slot.startTime} - {slot.endTime}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrainerCard;
