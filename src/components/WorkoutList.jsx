// src/components/WorkoutList.jsx
import React from "react";

const WorkoutList = ({ workouts, editWorkout }) => {
  return (
    <div className="workout-list">
      <h2>Workout History</h2>
      {workouts.length === 0 ? (
        <p>No workouts logged yet.</p>
      ) : (
        <ul>
          {workouts.map((workout, index) => (
            <li key={index}>
              <strong>{workout.exercise}</strong> - {workout.type}
              <br />
              Sets: {workout.sets}, Reps: {workout.reps}, Weight: {workout.weight} kg, Duration: {workout.duration} min
              <br />
              Notes: {workout.notes}
              <br />
              <button onClick={() => editWorkout(index)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;
