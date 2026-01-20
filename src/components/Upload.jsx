import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { videoStore } from '../stores/videoStore';
import './VideoFeed.css';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState('');
    const navigate = useNavigate();

    const handleUpload = () => {
        if (file && desc) {
            videoStore.uploadVideo(file, desc);
            navigate('/');
        }
    };

    return (
        <div style={{ color: 'white', backgroundColor: '#000', height: '100vh', padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <span onClick={() => navigate('/')} style={{ fontSize: '24px' }}>✕</span>
                <h3 style={{ margin: 0 }}>Upload Video</h3>
                <button
                    onClick={handleUpload}
                    style={{
                        backgroundColor: '#ff3b5c',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        opacity: (file && desc) ? 1 : 0.5
                    }}
                    disabled={!file || !desc}
                >
                    Post
                </button>
            </header>

            <div style={{ border: '2px dashed #333', height: '300px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
                {file ? (
                    <p>Selected: {file.name}</p>
                ) : (
                    <>
                        <span style={{ fontSize: '40px' }}>📤</span>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: 'none' }}
                            id="video-input"
                        />
                        <label htmlFor="video-input" style={{ cursor: 'pointer', color: '#ff3b5c' }}>Select Video</label>
                    </>
                )}
            </div>

            <textarea
                placeholder="Add a description... #douyin #clone"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{
                    width: '100%',
                    backgroundColor: '#111',
                    color: 'white',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    padding: '15px',
                    marginTop: '20px',
                    height: '100px',
                    fontSize: '16px'
                }}
            />
        </div>
    );
};

export default Upload;
