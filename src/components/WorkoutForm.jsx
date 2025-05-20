// src/components/WorkoutForm.jsx
import React, { useState, useEffect } from "react";

const WorkoutForm = ({ addOrUpdateWorkout, workoutToEdit }) => {
  const [exercise, setExercise] = useState("");
  const [type, setType] = useState("Strength");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (workoutToEdit) {
      setExercise(workoutToEdit.exercise);
      setType(workoutToEdit.type);
      setSets(workoutToEdit.sets);
      setReps(workoutToEdit.reps);
      setWeight(workoutToEdit.weight);
      setDuration(workoutToEdit.duration);
      setNotes(workoutToEdit.notes);
    }
  }, [workoutToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateWorkout({ exercise, type, sets, reps, weight, duration, notes });
    setExercise("");
    setType("Strength");
    setSets("");
    setReps("");
    setWeight("");
    setDuration("");
    setNotes("");
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Exercise Name" value={exercise} onChange={(e) => setExercise(e.target.value)} required />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Strength">Strength</option>
        <option value="Cardio">Cardio</option>
        <option value="Flexibility">Flexibility</option>
      </select>
      <input type="number" placeholder="Sets" value={sets} onChange={(e) => setSets(e.target.value)} />
      <input type="number" placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)} />
      <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <input type="number" placeholder="Duration (min)" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
      <button type="submit">{workoutToEdit ? "Update Workout" : "Add Workout"}</button>
    </form>
  );
};

export default WorkoutForm;
