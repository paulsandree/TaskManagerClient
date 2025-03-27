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
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Liste des Tâches</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="border p-2 flex-grow rounded-l"
                    placeholder="Ajouter une tâche..."
                />
                <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded-r">
                    Ajouter
                </button>
            </div>
            <ul>
                {Array.isArray(tasks) && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id} className="flex justify-between items-center p-2 border-b">
                            <span
                                className={`cursor-pointer ${task.isCompleted ? "line-through text-gray-500" : ""}`}
                                onClick={() => handleToggleTask(task)}
                            >
                                {task.title}
                            </span>
                            <button onClick={() => handleDeleteTask(task.id)} className="text-red-500">
                                Supprimer
                            </button>
                        </li>
                    ))
                ) : (
                    <p>Aucune tâche à afficher</p>  // Affiche un message si tasks n'est pas un tableau
                )}
            </ul>
        </div>
    );
}
