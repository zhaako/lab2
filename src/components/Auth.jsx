import  { useState } from 'react';

function Auth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div>
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                {isLoggedIn ? 'Logout' : 'Login'}
            </button>
        </div>
    );
}

export default Auth;