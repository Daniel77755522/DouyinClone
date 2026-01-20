import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { videoStore } from '../stores/videoStore';
import './VideoFeed.css';

const VideoFeed = observer(() => {
    useEffect(() => {
        videoStore.fetchVideos();
    }, []);

    if (videoStore.loading) return <div className="loading" style={{ color: 'white', backgroundColor: '#000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading videos...</div>;

    return (
        <>
            <div className="video-container">
                {videoStore.videos.map((video, index) => (
                    <div key={video.id} className="video-card">
                        <video
                            src={video.url}
                            loop
                            autoPlay={index === videoStore.currentVideoIndex}
                            muted
                            className="video-element"
                        />
                        <div className="video-sidebar">
                            <div className="sidebar-item">
                                <div className="sidebar-icon">❤️</div>
                                <span className="sidebar-count">{video.likes}</span>
                            </div>
                            <div className="sidebar-item">
                                <div className="sidebar-icon">💬</div>
                                <span className="sidebar-count">{video.comments}</span>
                            </div>
                            <div className="sidebar-item">
                                <div className="sidebar-icon">✨</div>
                                <span className="sidebar-count">Save</span>
                            </div>
                            <div className="sidebar-item">
                                <div className="sidebar-icon">↪️</div>
                                <span className="sidebar-count">{video.shares}</span>
                            </div>
                        </div>
                        <div className="video-footer">
                            <h4>@{video.author}</h4>
                            <p>{video.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Premium Bottom Navigation */}
            <nav className="bottom-nav">
                <div className="nav-item active">Home</div>
                <div className="nav-item">Friends</div>
                <div className="nav-add-btn">+</div>
                <div className="nav-item">Inbox</div>
                <div className="nav-item">Profile</div>
            </nav>
        </>
    );
});

export default VideoFeed;
