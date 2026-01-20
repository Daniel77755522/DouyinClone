import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '../stores/userStore';

const Profile = observer(() => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isMe = id === 'me' || id === userStore.user?.username;

    // Fallback if not logged in and trying to see 'me'
    if (id === 'me' && !userStore.isAuthenticated) {
        return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>
            <h2>Please log in to see your profile</h2>
            <button onClick={() => navigate('/login')} style={{ backgroundColor: '#ff3b5c', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>Login</button>
        </div>;
    }

    const userData = isMe ? userStore.user : {
        username: id,
        displayName: id,
        avatar: '👤',
        stats: { following: 50, followers: '10K', likes: '100K' }
    };

    return (
        <div style={{ color: 'white', backgroundColor: '#000', minHeight: '100vh', padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span onClick={() => navigate('/')} style={{ fontSize: '24px', cursor: 'pointer' }}>←</span>
                <span>{userData.username}</span>
                <span onClick={() => { if (isMe) { userStore.logout(); navigate('/login'); } }} style={{ cursor: 'pointer' }}>{isMe ? 'Logout' : '⋮'}</span>
            </header>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <div style={{ width: '100px', height: '100px', backgroundColor: '#333', borderRadius: '50%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px' }}>{userData.avatar}</div>
                <h2 style={{ margin: '15px 0 5px' }}>@{userData.username}</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px', color: '#888' }}>
                    <span><strong>{userData.stats.following}</strong> Following</span>
                    <span><strong>{userData.stats.followers}</strong> Followers</span>
                    <span><strong>{userData.stats.likes}</strong> Likes</span>
                </div>
                <button
                    onClick={() => alert('Edit Profile clicked!')}
                    style={{ marginTop: '20px', padding: '10px 40px', backgroundColor: '#333', border: 'none', color: 'white', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    {isMe ? 'Edit Profile' : 'Follow'}
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
                <span style={{ borderBottom: '2px solid white', paddingBottom: '10px' }}>Videos</span>
                <span style={{ color: '#555' }}>🔒 Liked</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', marginTop: '2px' }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} onClick={() => navigate('/')} style={{ aspectRatio: '3/4', backgroundColor: '#111', position: 'relative', cursor: 'pointer' }}>
                        <span style={{ position: 'absolute', bottom: '5px', left: '5px', fontSize: '12px' }}>▶ 12.{i}K</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Profile;
