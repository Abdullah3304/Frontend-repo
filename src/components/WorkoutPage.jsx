import React, { useState, useEffect, useCallback } from "react";
import WorkoutForm from "./WorkoutForm";
import WorkoutList from "./WorkoutList";
import ProgressTracker from "./ProgressTracker";
import '../Stylings/WorkoutPage.css';

// Backend URL, updated dynamically based on environment
const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // Vercel deployed backend URL in production
    return 'https://your-backend-url.vercel.app/api/workouts'; // replace with your actual deployed backend URL
  } else {
    // localhost for local development
    return 'http://localhost:5000/api/workouts';
  }
};

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Memoize fetchWorkouts to prevent unnecessary re-renders
  const fetchWorkouts = useCallback(async () => {
    try {
      const headers = getAuthHeader();
      console.log('Request headers:', headers);
      
      const response = await fetch(getApiUrl(), {
        headers: headers
      });

      // Check if response is okay (status code 200)
      if (!response.ok) {
        throw new Error(`Error fetching workouts: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched workouts:', data);
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  }, []);

  // UseEffect will run only once (on mount) since fetchWorkouts is memoized
  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const addOrUpdateWorkout = async (workout) => {
    try {
      const headers = getAuthHeader();
      let response;
      
      // Updating an existing workout
      if (editingIndex !== null) {
        console.log('Updating workout:', workout);
        response = await fetch(`${getApiUrl()}/${workouts[editingIndex]._id}`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(workout),
        });
        
        if (!response.ok) {
          throw new Error('Error updating workout');
        }

        const updatedWorkout = await response.json();
        const updatedWorkouts = [...workouts];
        updatedWorkouts[editingIndex] = updatedWorkout;
        setWorkouts(updatedWorkouts);
        setEditingIndex(null);
      } else {
        // Creating a new workout
        response = await fetch(getApiUrl(), {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(workout),
        });

        if (!response.ok) {
          throw new Error('Error creating new workout');
        }

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
