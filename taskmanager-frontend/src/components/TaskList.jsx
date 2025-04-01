import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../services/api";
import TaskForm from "./TaskForm";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);

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

    const handleSelectTask = (task) => {
        setSelectedTask(task);
    };

    const handleSaveTask = async (updatedTask) => {
        await updateTask(updatedTask.id, updatedTask);
        setSelectedTask(null);
        fetchTasks();
    };

    const handleCancel = () => {
        setSelectedTask(null);
    };


    return (
        <div className="p-8 max-w-full sm:max-w-lg lg:max-w-3xl mx-auto bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 shadow-lg rounded-xl">
            <div className="flex flex-col sm:flex-row mb-6 gap-4 sm:gap-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="border-2 border-gray-300 p-3 flex-grow rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out"
                    placeholder="Ajouter une tâche..."
                />
                <button
                    onClick={handleAddTask}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-md hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                    Ajouter
                </button>
            </div>
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={`flex justify-between items-center p-5 bg-white shadow-xl rounded-lg transition-all ease-in-out transform hover:scale-105 ${task.isCompleted ? "bg-green-50" : "bg-yellow-50"}`}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`text-lg sm:text-xl ${task.isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}>
                                {task.title}
                            </span>
                            <span
                                onClick={() => handleToggleTask(task)}
                                className={`cursor-pointer text-sm px-3 py-1 rounded-full ${task.isCompleted ? "bg-green-600 text-white" : "bg-yellow-500 text-white"} transition-colors duration-300 hover:bg-opacity-80`}
                            >
                                {task.isCompleted ? "Complétée" : "En cours"}
                            </span>
                        </div>
                        <button
                            onClick={() => handleSelectTask(task)}
                            className="text-blue-500 hover:text-blue-700 text-xl transition-all ease-in-out"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-500 hover:text-red-700 text-xl transition-all ease-in-out"
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
            {selectedTask && (
                <TaskForm
                    task={selectedTask}
                    onSave={handleSaveTask}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}
