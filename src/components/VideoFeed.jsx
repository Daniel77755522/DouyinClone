import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { videoStore } from '../stores/videoStore';
import './VideoFeed.css';

const VideoCard = observer(({ video }) => {
    const videoRef = useRef(null);
    const [showComments, setShowComments] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [hearts, setHearts] = useState([]);

    const handleDoubleClick = (e) => {
        const newHeart = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY
        };
        setHearts(prev => [...prev, newHeart]);
        if (!video.isLiked) {
            videoStore.toggleLike(video.id);
        }

        // Remove heart after animation
        setTimeout(() => {
            setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 1000);
    };

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
        <div className="video-card" onDoubleClick={handleDoubleClick}>
            <video
                ref={videoRef}
                src={video.url}
                loop
                muted
                playsInline
                className="video-element"
            />

            {/* Heart Animations */}
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="floating-heart"
                    style={{ left: heart.x, top: heart.y }}
                >
                    ❤️
                </div>
            ))}

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

                <div className="sidebar-item" onClick={() => setShowShare(true)}>
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

            {/* Share Drawer */}
            <div className={`share-modal ${showShare ? 'show' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <strong>Share to</strong>
                </div>
                <div className="share-grid">
                    <div className="share-item">
                        <div className="share-icon">🔗</div>
                        <span>Copy Link</span>
                    </div>
                    <div className="share-item">
                        <div className="share-icon" style={{ backgroundColor: '#25D366', color: 'white' }}>💬</div>
                        <span>WhatsApp</span>
                    </div>
                    <div className="share-item">
                        <div className="share-icon" style={{ backgroundColor: '#1877F2', color: 'white' }}>f</div>
                        <span>Facebook</span>
                    </div>
                    <div className="share-item">
                        <div className="share-icon">📥</div>
                        <span>Save Video</span>
                    </div>
                </div>
                <button
                    onClick={() => setShowShare(false)}
                    style={{ width: '100%', padding: '15px', border: 'none', background: 'none', borderTop: '1px solid #eee', marginTop: '10px', fontWeight: 'bold' }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
});

import { Link, useNavigate } from 'react-router-dom';

const VideoFeed = observer(() => {
    const navigate = useNavigate();
    useEffect(() => {
        videoStore.fetchVideos();
    }, []);

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight + 50) {
            videoStore.loadMoreVideos();
        }
    };

    if (videoStore.loading) return <div className="loading" style={{ color: 'white', backgroundColor: '#000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Douyin Feed...</div>;

    return (
        <>
            <header className="feed-header">
                <div style={{ position: 'absolute', left: '20px', color: '#ff3b5c', fontWeight: 'bold' }}>LIVE</div>
                <div className="header-item">Following</div>
                <div className="header-item active">For You</div>
            </header>

            <div className="video-container" onScroll={handleScroll}>
                {videoStore.videos.length === 0 ? (
                    <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>
                        <p>No videos yet.</p>
                        <Link to="/upload" style={{ color: '#ff3b5c' }}>Upload your first video!</Link>
                    </div>
                ) : (
                    videoStore.videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))
                )}
            </div>

            <nav className="bottom-nav">
                <div className="nav-item active" onClick={() => navigate('/')}>Home</div>
                <div className="nav-item" onClick={() => navigate('/search')}>Friends</div>
                <div className="nav-add-btn" onClick={() => navigate('/upload')}>+</div>
                <div className="nav-item" onClick={() => navigate('/inbox')}>Inbox</div>
                <div className="nav-item" onClick={() => navigate('/profile/me')}>Profile</div>
            </nav>
        </>
    );
});

export default VideoFeed;
