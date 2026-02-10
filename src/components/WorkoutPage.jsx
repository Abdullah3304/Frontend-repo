// src/components/App.jsx
import React, { useState, useEffect } from "react";
import WorkoutForm from "./WorkoutForm";
import WorkoutList from "./WorkoutList";
import ProgressTracker from "./ProgressTracker";
import '../Stylings/WorkoutPage.css';
import pic from '../assets/pic.jpg'; // Import the image

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchWorkouts = async () => {
    try {
      const headers = getAuthHeader();
      console.log('Request headers:', headers);
      const response = await fetch('http://localhost:5000/api/workouts', {
        headers: headers
      });
      const data = await response.json();
      console.log('Fetched workouts:', data);
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const addOrUpdateWorkout = async (workout) => {
    try {
      const headers = getAuthHeader();
      if (editingIndex !== null) {
        console.log('Updating workout:', workout);
        const response = await fetch(`http://localhost:5000/api/workouts/${workouts[editingIndex]._id}`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(workout)
        });
        const updatedWorkout = await response.json();
        const updatedWorkouts = [...workouts];
        updatedWorkouts[editingIndex] = updatedWorkout;
        setWorkouts(updatedWorkouts);
        setEditingIndex(null);
      } else {
        const response = await fetch('http://localhost:5000/api/workouts', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(workout)
        });
        const newWorkout = await response.json();
        console.log('Created workout response:', newWorkout);
        setWorkouts([...workouts, newWorkout]);
      }
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  const editWorkout = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="workout-page">
      <div className="container">
        <h1>Progress Tracking</h1>
        <WorkoutForm
          addOrUpdateWorkout={addOrUpdateWorkout}
          workoutToEdit={editingIndex !== null ? workouts[editingIndex] : null}
        />
        <WorkoutList workouts={workouts} editWorkout={editWorkout} />
        <ProgressTracker workouts={workouts} />
      </div>
    </div>
  );
};

export default App;
