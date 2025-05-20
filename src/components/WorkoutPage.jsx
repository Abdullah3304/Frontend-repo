// src/components/App.jsx
import React, { useState } from "react";
import WorkoutForm from "./WorkoutForm";
import WorkoutList from "./WorkoutList";
import ProgressTracker from "./ProgressTracker";
import '../Stylings/WorkoutPage.css';

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addOrUpdateWorkout = (workout) => {
    if (editingIndex !== null) {
      const updatedWorkouts = [...workouts];
      updatedWorkouts[editingIndex] = workout;
      setWorkouts(updatedWorkouts);
      setEditingIndex(null);
    } else {
      setWorkouts([...workouts, workout]);
    }
  };

  const editWorkout = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="container">
      <h1>Progress Tracker</h1>
      <WorkoutForm
        addOrUpdateWorkout={addOrUpdateWorkout}
        workoutToEdit={editingIndex !== null ? workouts[editingIndex] : null}
      />
      <WorkoutList workouts={workouts} editWorkout={editWorkout} />
      <ProgressTracker workouts={workouts} />
    </div>
  );
};

export default App;
