import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../services/api";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleAddTask = async () => {
        if (!newTask.trim()) return;
        await addTask({ title: newTask, description: "", isCompleted: false });
        setNewTask("");
        fetchTasks();
    };

    const handleToggleTask = async (task) => {
        await updateTask(task.id, { ...task, isCompleted: !task.isCompleted });
        fetchTasks();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Liste des Tâches</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="border p-2 flex-grow rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Ajouter une tâche..."
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
                >
                    Ajouter
                </button>
            </div>
            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex justify-between items-center p-3 bg-gray-100 rounded shadow"
                    >
                        <div className="flex items-center gap-2">
                            <span className={`${task.isCompleted ? "line-through text-gray-500" : ""}`}>
                                {task.title}
                            </span>
                            <span className={`cursor-pointer text-sm px-2 py-1 rounded ${task.isCompleted ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}
                            onClick={() => handleToggleTask(task)}>
                                {task.isCompleted ? "Complétée" : "En cours"}
                            </span>
                        </div>
                        <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
