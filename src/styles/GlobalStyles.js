import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --primary: #ff6347; /* Оранжевый */
        --secondary: #282c34; /* Тёмный */
        --background-light: #f4f4f4;
        --background-dark: #1e1e1e;
        --text-light: #333;
        --text-dark: #fff;
        --border-radius: 10px;
    }

    body {
        font-family: 'Inter', sans-serif;
        background: ${({ theme }) => (theme === 'light' ? 'var(--background-light)' : 'var(--background-dark)')};
        color: ${({ theme }) => (theme === 'light' ? 'var(--text-light)' : 'var(--text-dark)')};
        transition: all 0.3s ease-in-out;
        margin: 0;
        padding: 0;
    }

    button {
        background: var(--primary);
        color: #fff;
        border: none;
        padding: 10px 15px;
        border-radius: var(--border-radius);
        cursor: pointer;
        font-size: 16px;
        transition: 0.3s;
    }

    button:hover {
        opacity: 0.8;
    }

    .app-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding: 20px;
    }
`;

export default GlobalStyles;
