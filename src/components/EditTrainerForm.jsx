import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTrainerForm = ({ trainer, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    specialization: [],
    price: '',
    availability: '',
    description: '',
    availableSlots: '',
    image: null,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (trainer) {
      setFormData({
        ...trainer,
        specialization: trainer.specialization || [],
        availableSlots: JSON.stringify(trainer.availableSlots || []),
        image: null
      });
    }
  }, [trainer]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      for (let key in formData) {
        if (key === 'specialization') {
          form.append(key, JSON.stringify(formData[key]));
        } else {
          form.append(key, formData[key]);
        }
      }

      const res = await axios.put(
        `/api/trainers/update-trainer/${trainer._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      alert('Profile updated successfully!');
      onUpdateSuccess(res.data); // Update parent
    } catch (err) {
      console.error(err);
      alert('Failed to update trainer');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Your Profile</h3>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
      <input type="text" name="specialization" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value.split(',') })} placeholder="Specialization (comma separated)" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder="Availability" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="text" name="availableSlots" value={formData.availableSlots} onChange={handleChange} placeholder='Available Slots JSON' />
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditTrainerForm;
