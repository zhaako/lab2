import  { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme} style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: theme === 'light' ? '#282c34' : '#ff6347',
            color: '#fff',
            padding: '8px 15px',
            borderRadius: '10px',
        }}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
}

export default ThemeToggle;
