import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTrainerForm from './EditTrainerForm';

const MyTrainerProfile = () => {
    const [trainer, setTrainer] = useState(null);
    const [editing, setEditing] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/api/trainers/my-trainer', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setTrainer(res.data))
            .catch(err => console.error(err));
    }, []);


    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete your profile?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/trainers/delete-trainer/${trainer._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Profile deleted');
        } catch (err) {
            console.error(err);
            alert('Failed to delete');
        }
    };

    if (!trainer) return <div>Loading...</div>;

    return (
        <div className="trainer-profile">
            <h2>Welcome, {trainer.name}</h2>
            {editing ? (
                <EditTrainerForm trainer={trainer} onUpdateSuccess={(updated) => {
                    setTrainer(updated);
                    setEditing(false);
                }} />
            ) : (
                <>
                    <img src={`/${trainer.image}`} alt={trainer.name} />
                    <p>Specialization: {trainer.specialization.join(', ')}</p>
                    <p>Price: ₹{trainer.price}</p>
                    <p>Description: {trainer.description}</p>
                    <p>Availability: {trainer.availability}</p>
                    <p>Email: {trainer.gmail}</p>

                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
                </>
            )}
        </div>
    );
};

export default MyTrainerProfile;
