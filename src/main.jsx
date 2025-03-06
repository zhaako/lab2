import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <TaskProvider>
                <GlobalStyles />
                <App />
            </TaskProvider>
        </ThemeProvider>
    </React.StrictMode>
);
