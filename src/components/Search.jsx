import React from 'react';
import './VideoFeed.css'; // Reuse some basic styles or add specific ones

const Search = () => {
    const trending = ['#Cyberpunk', '#DanceChallenge', '#TechReels', '#NatureVibe'];

    return (
        <div style={{ color: 'white', padding: '20px', backgroundColor: '#111', height: '100vh' }}>
            <div style={{ padding: '10px 0' }}>
                <input
                    type="text"
                    placeholder="Search videos, users, sounds..."
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '25px',
                        border: 'none',
                        backgroundColor: '#333',
                        color: 'white',
                        fontSize: '16px'
                    }}
                />
            </div>

            <h3 style={{ marginTop: '20px' }}>Trending</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {trending.map(tag => (
                    <div key={tag} style={{ backgroundColor: '#222', padding: '15px', borderRadius: '10px', fontSize: '14px' }}>
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
