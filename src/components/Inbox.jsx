import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { videoStore } from '../stores/videoStore';

const Inbox = observer(() => {
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = React.useState(null);
    const [msg, setMsg] = React.useState('');

    const activities = [
        { id: 1, user: 'cyberpunk_queen', action: 'liked your video', time: '2h', avatar: '👑', messages: ['Hey! love your videos', 'Thanks for the follow!'] },
        { id: 2, user: 'blue_dancer', action: 'started following you', time: '5h', avatar: '💃', messages: ['Hi!', 'When is the next dance?'] },
        { id: 3, user: 'nature_vibe', action: 'commented: "Amazing!"', time: '1d', avatar: '🌿', messages: [] },
    ];

    if (selectedChat) {
        return (
            <div style={{ color: 'white', backgroundColor: '#000', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <header style={{ padding: '20px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span onClick={() => setSelectedChat(null)} style={{ fontSize: '24px', cursor: 'pointer' }}>←</span>
                    <strong>{selectedChat.user}</strong>
                </header>
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedChat.messages.map((m, i) => (
                        <div key={i} style={{ alignSelf: 'flex-start', backgroundColor: '#222', padding: '10px 15px', borderRadius: '15px', maxWidth: '80%' }}>{m}</div>
                    ))}
                    <div style={{ alignSelf: 'flex-end', backgroundColor: '#ff3b5c', padding: '10px 15px', borderRadius: '15px', maxWidth: '80%' }}>Hello! Thanks for reaching out.</div>
                </div>
                <div style={{ padding: '20px', borderTop: '1px solid #222', display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Send message..."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        style={{ flex: 1, backgroundColor: '#111', border: '1px solid #333', padding: '10px', borderRadius: '20px', color: 'white' }}
                    />
                    <button style={{ color: '#ff3b5c', background: 'none', border: 'none', fontWeight: 'bold' }}>Send</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ color: 'white', backgroundColor: '#000', minHeight: '100vh', padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', borderBottom: '1px solid #222', paddingBottom: '15px' }}>
                <h3 style={{ margin: 0 }}>All Activity</h3>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activities.map(act => (
                    <div key={act.id} onClick={() => setSelectedChat(act)} style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#222', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
                            {act.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontWeight: 'bold' }}>{act.user}</span> {act.action}
                            <div style={{ color: '#555', fontSize: '12px' }}>{act.time}</div>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); videoStore.toggleFollow(act.user); }}
                            style={{ backgroundColor: videoStore.following.has(act.user) ? '#333' : '#ff3b5c', border: 'none', color: 'white', padding: '5px 15px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                        >
                            {videoStore.following.has(act.user) ? 'Following' : 'Follow'}
                        </button>
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
});

export default Inbox;
