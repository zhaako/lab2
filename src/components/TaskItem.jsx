import  { useContext } from 'react';
import PropTypes from 'prop-types';
import { TaskContext } from '../context/TaskContext';

function TaskItem({ task }) {
    const { updateTask, deleteTask } = useContext(TaskContext);

    return (
        <div style={{
            background: '#fff',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '10px',
            width: '300px'
        }}>
            <h3 style={{ margin: '5px 0' }}>{task.title}</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>{task.description}</p>
            <button
                onClick={() => updateTask(task.id, { ...task, status: task.status === 'In Progress' ? 'Completed' : 'In Progress' })}
                style={{
                    marginRight: '5px',
                    background: task.status === 'In Progress' ? 'green' : 'gray'
                }}>
                {task.status === 'In Progress' ? '✅ Mark Completed' : '🔄 Mark In Progress'}
            </button>
            <button onClick={() => deleteTask(task.id)} style={{ background: 'red' }}>❌ Delete</button>
        </div>
    );
}

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    }).isRequired
};

export default TaskItem;
