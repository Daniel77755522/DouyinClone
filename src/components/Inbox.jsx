import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inbox = () => {
    const navigate = useNavigate();
    const activities = [
        { id: 1, user: 'cyberpunk_queen', action: 'liked your video', time: '2h', avatar: '👑' },
        { id: 2, user: 'blue_dancer', action: 'started following you', time: '5h', avatar: '💃' },
        { id: 3, user: 'nature_vibe', action: 'commented: "Amazing!"', time: '1d', avatar: '🌿' },
    ];

    return (
        <div style={{ color: 'white', backgroundColor: '#000', minHeight: '100vh', padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', borderBottom: '1px solid #222', paddingBottom: '15px' }}>
                <h3 style={{ margin: 0 }}>All Activity</h3>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activities.map(act => (
                    <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#222', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
                            {act.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontWeight: 'bold' }}>{act.user}</span> {act.action}
                            <div style={{ color: '#555', fontSize: '12px' }}>{act.time}</div>
                        </div>
                        <button style={{ backgroundColor: '#ff3b5c', border: 'none', color: 'white', padding: '5px 15px', borderRadius: '4px', fontSize: '12px' }}>Follow</button>
                    </div>
                ))}
            </div>

            <nav className="bottom-nav">
                <div className="nav-item" onClick={() => navigate('/')}>Home</div>
                <div className="nav-item" onClick={() => navigate('/search')}>Friends</div>
                <div className="nav-add-btn" onClick={() => navigate('/upload')}>+</div>
                <div className="nav-item active">Inbox</div>
                <div className="nav-item" onClick={() => navigate('/profile/me')}>Profile</div>
            </nav>
        </div>
    );
};

export default Inbox;
