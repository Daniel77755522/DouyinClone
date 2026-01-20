import React from 'react';

const Profile = () => {
    return (
        <div style={{ color: 'white', backgroundColor: '#000', minHeight: '100vh', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <div style={{ width: '100px', height: '100px', backgroundColor: '#333', borderRadius: '50%', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px' }}>👤</div>
                <h2 style={{ margin: '15px 0 5px' }}>@Daniel77755522</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px', color: '#888' }}>
                    <span><strong>120</strong> Following</span>
                    <span><strong>45K</strong> Followers</span>
                    <span><strong>1.2M</strong> Likes</span>
                </div>
                <button style={{ marginTop: '20px', padding: '10px 40px', backgroundColor: '#333', border: 'none', color: 'white', borderRadius: '5px', fontWeight: 'bold' }}>Edit Profile</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
                <span style={{ borderBottom: '2px solid white', paddingBottom: '10px' }}>Videos</span>
                <span style={{ color: '#555' }}>🔒 Liked</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', marginTop: '2px' }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} style={{ aspectRatio: '3/4', backgroundColor: '#111', position: 'relative' }}>
                        <span style={{ position: 'absolute', bottom: '5px', left: '5px', fontSize: '12px' }}>▶ 12.{i}K</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
