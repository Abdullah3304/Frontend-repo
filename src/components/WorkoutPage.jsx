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

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/workouts');
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const addOrUpdateWorkout = async (workout) => {
    try {
    if (editingIndex !== null) {
        const response = await fetch(`http://localhost:5000/api/workouts/${workouts[editingIndex]._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(workout)
        });
        const newWorkout = await response.json();
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
