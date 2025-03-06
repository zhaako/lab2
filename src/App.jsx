import React from 'react';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import ThemeToggle from './components/ThemeToggle';
import Auth from './components/Auth';

function App() {
    console.log("App is rendering...");
    return (
        <div className="app-container">
            <Auth />
            <ThemeToggle />
            <TaskList />
            <PomodoroTimer />
        </div>
    );
}

export default App;
