import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';

const Login = observer(() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        userStore.login(username, password);
        // After mock delay, the userStore will update. We can check and navigate in a useEffect or just wait here.
        setTimeout(() => navigate('/'), 1000);
    };

    return (
        <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', color: 'white' }}>
            <h1 style={{ color: '#ff3b5c', fontSize: '3rem', marginBottom: '20px' }}>Douyin</h1>
            <p style={{ opacity: 0.7, marginBottom: '40px' }}>Sign in to continue</p>

            <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    placeholder="Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '15px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: 'white' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '15px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: 'white' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '15px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#ff3b5c',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                >
                    Log In
                </button>
            </form>

            <div style={{ marginTop: '40px', fontSize: '14px', opacity: 0.5, textAlign: 'center' }}>
                <p>New here? <span style={{ color: '#ff3b5c' }}>Create account</span></p>
                <p style={{ marginTop: '10px' }}>Continuing means you agree to our Terms.</p>
            </div>
        </div>
    );
});

export default Login;
