import  { useState, useEffect } from 'react';

function PomodoroTimer() {
    const [time, setTime] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    return (
        <div style={{
            background: '#282c34',
            color: '#fff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            width: '200px'
        }}>
            <h2>⏳ Pomodoro Timer</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
            </p>
            <button
                onClick={() => setIsRunning(!isRunning)}
                style={{ background: isRunning ? 'gray' : 'green' }}>
                {isRunning ? '⏸ Pause' : '▶ Start'}
            </button>
        </div>
    );
}

export default PomodoroTimer;
