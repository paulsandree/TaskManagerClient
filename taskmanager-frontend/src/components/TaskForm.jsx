import React, { useState, useEffect } from "react";

export default function TaskForm({ task, onSave, onCancel }) {
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || 1);

  useEffect(() => {
    if (task) {
      setDescription(task.description || "");
      setPriority(task.priority || 1);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      description,
      priority,
    };
    onSave(updatedTask);
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-semibold mb-3">Modifier la tâche</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Description"
          />
        </div>
        <div className="mb-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="1">Basse</option>
            <option value="2">Moyenne</option>
            <option value="3">Haute</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-md hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Sauvegarder
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-md hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
