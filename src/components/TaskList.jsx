import  { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
    const { tasks } = useContext(TaskContext);
    const [filter, setFilter] = useState('All');

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'All') return true;
        return task.status === filter;
    });

    return (
        <div>
            <h2>Task List</h2>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option>All</option>
                <option>In Progress</option>
                <option>Completed</option>
            </select>
            {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}

export default TaskList;