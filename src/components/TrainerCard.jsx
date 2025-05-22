import React, { useState } from 'react';
import '../Stylings/TrainerCard.css';
import { Link } from 'react-router-dom';
const TrainerCard = ({ trainer }) => {
    const [showSlots, setShowSlots] = useState(false);

    const toggleSlots = () => setShowSlots(!showSlots);

    return (
        <div className="trainer-card">
            <img
                src={`http://localhost:5000/${trainer.image}`}
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

                <div className="button-group">
                    <Link to={`/hire-trainer/${trainer._id}`} className="btn">
                        Hire Now
                    </Link>
                </div>

                <button className="toggle-slots-btn" onClick={toggleSlots}>
                    {showSlots ? 'Hide Slots' : 'Show Available Slots'}
                </button>

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
