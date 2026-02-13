import React, { useState } from 'react';
import axios from 'axios';
import heroBg from '../assets/hero-bg.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL, BASE_URL } from '../config/api';

import '../Stylings/RegisterTrainer.css';

const RegisterTrainer = () => {
    const [trainerData, setTrainerData] = useState({
        name: '',
        gender: 'male',
        specialization: [],
        price: '',
        availability: 'online',
        description: '',
        image: '',
        gmail: '',
        onlineClassLink: '',
        gymLocation: ''
    });

    const [slots, setSlots] = useState([{ day: '', startTime: '', endTime: '' }]);

    const specializationOptions = ["Yoga", "CrossFit", "Cardio", "Bodybuilding", "HIIT", "Zumba"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "specialization") {
            const selected = Array.from(e.target.selectedOptions, option => option.value);
            setTrainerData(prev => ({ ...prev, specialization: selected }));
        } else {
            setTrainerData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSlotChange = (index, e) => {
        const updatedSlots = [...slots];
        updatedSlots[index][e.target.name] = e.target.value;
        setSlots(updatedSlots);
    };

    const addSlot = () => {
        setSlots([...slots, { day: '', startTime: '', endTime: '' }]);
    };

    const removeSlot = (index) => {
        const updatedSlots = [...slots];
        updatedSlots.splice(index, 1);
        setSlots(updatedSlots);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', trainerData.name);
        formData.append('gender', trainerData.gender);
        formData.append('specialization', trainerData.specialization.join(', '));
        formData.append('price', trainerData.price);
        formData.append('availability', trainerData.availability);
        formData.append('description', trainerData.description);
        formData.append('gmail', trainerData.gmail);
        formData.append('availableSlots', JSON.stringify(slots));
        formData.append('onlineClassLink', trainerData.onlineClassLink);
        formData.append('gymLocation', trainerData.gymLocation);
        formData.append('token', token)
        if (trainerData.image && trainerData.image instanceof File) {
            formData.append('image', trainerData.image);
        }

        try {
            await axios.post(`${API_BASE_URL}/trainers/register', formData,
                {
                    params: {
                        token: token
                    }
                }
            );
            toast.success('Trainer registered successfully!');
            setTrainerData({
                name: '',
                gender: 'male',
                specialization: [],
                price: '',
                availability: 'online',
                description: '',
                image: '',
                gmail: '',
                token: token,
            });
            setSlots([{ day: '', startTime: '', endTime: '' }]);
        } catch (error) {
            console.error(error);
            toast.error('There was an error registering the trainer.');
        }
    };

    return (
        <div
            className="register-hero-section"
            style={{
                backgroundImage: `url(${heroBg})`,
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
                    <div className="register-form-wrapper">
                        {/* Left side form */}
                        <form onSubmit={handleSubmit} className="grid-form">
                            <input type="text" name="name" value={trainerData.name} onChange={handleChange} placeholder="Name" required />
                            <input type="email" name="gmail" value={trainerData.gmail} onChange={handleChange} placeholder="Email" required />

                            <select name="specialization" multiple value={trainerData.specialization} onChange={handleChange} required>
                                <option disabled value="">Select Specializations</option>
                                {specializationOptions.map((spec, index) => (
                                    <option key={index} value={spec}>{spec}</option>
                                ))}
                            </select>
                            <input type="number" name="price" value={trainerData.price} onChange={handleChange} placeholder="Fees" required />

                            <select name="gender" value={trainerData.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <select name="availability" value={trainerData.availability} onChange={handleChange}>
                                <option value="online">Online Session</option>
                                <option value="physical">Physical Session</option>
                            </select>
                            {trainerData.availability === 'online' && (
                                <input
                                    type="text"
                                    name="onlineClassLink"
                                    value={trainerData.onlineClassLink}
                                    onChange={handleChange}
                                    placeholder="Online Class Link"
                                    required
                                />
                            )}

                            {trainerData.availability === 'physical' && (
                                <input
                                    type="text"
                                    name="gymLocation"
                                    value={trainerData.gymLocation}
                                    onChange={handleChange}
                                    placeholder="Gym Location"
                                    required
                                />
                            )}

                            <textarea name="description" value={trainerData.description} onChange={handleChange} placeholder="Description" required style={{ gridColumn: '1 / -1' }} />
                            <input type="file" name="image" accept="image/*" onChange={(e) => setTrainerData({ ...trainerData, image: e.target.files[0] })} style={{ gridColumn: '1 / -1' }} />

                            <button type="submit" style={{ gridColumn: '1 / -1' }}>Register</button>
                        </form>

                        {/* Right side slot box */}
                        <div className="slot-box">
                            <h4>Available Slots</h4>
                            <div className="slot-container-scroll">
                                {slots.map((slot, index) => (
                                    <div key={index} className="slot-group">
                                        <input type="text" name="day" value={slot.day} onChange={(e) => handleSlotChange(index, e)} placeholder="Day" required />
                                        <input type="time" name="startTime" value={slot.startTime} onChange={(e) => handleSlotChange(index, e)} required />
                                        <input type="time" name="endTime" value={slot.endTime} onChange={(e) => handleSlotChange(index, e)} required />
                                        {slots.length > 1 && (
                                            <button type="button" onClick={() => removeSlot(index)} className="remove-slot">Remove</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={addSlot} className="add-slot">Add Slot</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default RegisterTrainer;
