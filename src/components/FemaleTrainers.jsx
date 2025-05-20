import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainerCard from './TrainerCard';
import '../Stylings/FemaleTrainers.css';  // Ensure the import is correct
import TrainerMain from './Trainer_Main';


const FemaleTrainers = () => {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/trainers/female')
            .then((response) => {
                setTrainers(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching female trainers:', error);
            });
    }, []);

    return (
        <div className="trainers-container">
            <h1>Female Trainers</h1>
            <div className="trainers-list">
                {trainers.map((trainer) => (
                    <TrainerCard key={trainer._id} trainer={trainer} />
                ))}
            </div>
        </div>
    );
};

export default FemaleTrainers;
