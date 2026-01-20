import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { videoStore } from '../stores/videoStore';
import './VideoFeed.css';

const VideoCard = observer(({ video }) => {
    const videoRef = useRef(null);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        const options = { threshold: 0.6 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoRef.current?.play();
                } else {
                    videoRef.current?.pause();
                    videoRef.current.currentTime = 0;
                }
            });
        }, options);

        if (videoRef.current) observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="video-card">
            <video
                ref={videoRef}
                src={video.url}
                loop
                muted
                playsInline
                className="video-element"
            />

            <div className="video-sidebar">
                <div className="sidebar-item">
                    <div className="author-disc">
                        <span style={{ fontSize: '20px' }}>👤</span>
                        <div
                            className={`follow-btn ${videoStore.following.has(video.author) ? 'following' : ''}`}
                            onClick={() => videoStore.toggleFollow(video.author)}
                        >
                            {videoStore.following.has(video.author) ? '✓' : '+'}
                        </div>
                    </div>
                </div>

                <div className="sidebar-item" onClick={() => videoStore.toggleLike(video.id)}>
                    <div className={`sidebar-icon ${video.isLiked ? 'liked' : ''}`}>❤️</div>
                    <span className="sidebar-count">{video.likes}</span>
                </div>

                <div className="sidebar-item" onClick={() => setShowComments(true)}>
                    <div className="sidebar-icon">💬</div>
                    <span className="sidebar-count">{video.comments.length}</span>
                </div>

                <div className="sidebar-item">
                    <div className="sidebar-icon">✨</div>
                    <span className="sidebar-count">Save</span>
                </div>

                <div className="sidebar-item">
                    <div className="sidebar-icon">↪️</div>
                    <span className="sidebar-count">{video.shares}</span>
                </div>

                <div className="sidebar-item">
                    <div className="music-disc"></div>
                </div>
            </div>

            <div className="video-footer">
                <h4>@{video.author}</h4>
                <p>{video.description}</p>
                <div className="music-ticker">
                    <span>🎵 {video.music}</span>
                </div>
            </div>

            {/* Comments Drawer */}
            <div className={`comments-modal ${showComments ? 'show' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <strong>{video.comments.length} comments</strong>
                    <span onClick={() => setShowComments(false)} style={{ cursor: 'pointer', fontSize: '20px' }}>✕</span>
                </div>
                <div style={{ overflowY: 'auto', height: '100%' }}>
                    {video.comments.map(c => (
                        <div key={c.id} className="comment-item">
                            <div className="comment-user">@{c.user}</div>
                            <div className="comment-text">{c.text}</div>
                        </div>
                    ))}
                    {video.comments.length === 0 && <p style={{ textAlign: 'center', opacity: 0.5 }}>No comments yet. Be the first!</p>}
                </div>
            </div>
        </div>
    );
});

const VideoFeed = observer(() => {
    useEffect(() => {
        videoStore.fetchVideos();
    }, []);

    if (videoStore.loading) return <div className="loading" style={{ color: 'white', backgroundColor: '#000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Douyin Feed...</div>;

    return (
        <>
            <header className="feed-header">
                <div className="header-item">Following</div>
                <div className="header-item active">For You</div>
            </header>

            <div className="video-container">
                {videoStore.videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>

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
