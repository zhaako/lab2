import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => setTasks([...tasks, task]);
    const updateTask = (id, updatedTask) => {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    };
    const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

// Добавляем валидацию пропсов
TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TaskProvider;
