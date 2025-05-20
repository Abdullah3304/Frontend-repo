// src/components/ProgressTracker.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ProgressTracker = ({ workouts }) => {
  // Transform workout data for visualization
  const progressData = workouts.map((workout, index) => ({
    day: `Day ${index + 1}`,
    weight: workout.weight || 0, // Default to 0 if no weight is provided
    duration: workout.duration || 0, // Default to 0 if no duration is provided
  }));

  return (
    <div className="progress-container">
      <h2>Progress Overview</h2>

      <div className="chart-container">
        <h3>Weight Lifted Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Workout Duration Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressTracker;
