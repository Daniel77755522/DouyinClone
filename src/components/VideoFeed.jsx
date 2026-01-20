import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { videoStore } from '../stores/vide9:44:00 AM: Netlify Build                                                 
9: 44:00 AM: ────────────────────────────────────────────────────────────────
9: 44:00 AM:
9: 44:00 AM: ❯ Version
9: 44:00 AM: @netlify/build 35.5.10
9: 44:00 AM:
9: 44:00 AM: ❯ Flags
9: 44:00 AM: accountId: 696f7c2b0f18e4ea40af5d26
9: 44:00 AM: baseRelDir: true
9: 44:00 AM: buildId: 696f8672516ce945e23b701e
9: 44:00 AM: deployId: 696f8672516ce945e23b7020
9: 44:00 AM:
9: 44:00 AM: ❯ Current directory
9: 44:00 AM: /opt/build / repo
9: 44:00 AM:
9: 44:00 AM: ❯ Config file
9: 44:00 AM: /opt/build / repo / netlify.toml
9: 44:00 AM:
9: 44:00 AM: ❯ Context
9: 44:00 AM: production
9: 44:00 AM:
9: 44:00 AM: Build command from Netlify app
9: 44:00 AM: ────────────────────────────────────────────────────────────────
9: 44:00 AM:
9: 44:00 AM: $ npm run build
9: 44:00 AM: > douyin - clone@1.0.0 build
9: 44:00 AM: > react - scripts build
9: 44:01 AM: Creating an optimized production build...
9: 44:09 AM: Failed during stage 'building site': Build script returned non - zero exit code: 2(https://ntl.fyi/exit-code-2)
    9: 44:09 AM: Failed to compile.
9: 44:09 AM:
    9: 44:09 AM: [eslint]
9: 44:09 AM: src / components / VideoFeed.jsx
9: 44:09 AM: Line 112: 82: 'navigate' is not defined  no - undef
9: 44:09 AM: Search for the keywords to learn more about each error.
9: 44:09 AM:
9: 44:09 AM: "build.command" failed
9: 44:09 AM: ────────────────────────────────────────────────────────────────
9: 44:09 AM:
9: 44:09 AM:   Error message
9: 44:09 AM:   Command failed with exit code 1: npm run build(https://ntl.fyi/exit-code-1)
    9: 44:09 AM:
    9: 44:09 AM: Error location
9: 44:09 AM: In Build command from Netlify app:
    9: 44:09 AM: npm run build
9: 44:09 AM:
    9: 44:09 AM: Resolved config
9: 44:09 AM: build:
    9: 44:09 AM: command: npm run build
9: 44:09 AM: commandOrigin: ui
9: 44:09 AM: publish: /opt/build / repo / build
9: 44:09 AM: publishOrigin: ui
9: 44:09 AM: headers:
    9: 44:09 AM: - for: /*
      values:
        Content-Security-Policy: upgrade-insecure-requests
        Permissions-Policy: camera=(), microphone=(), geolocation=()
        Referrer-Policy: strict-origin-when-cross-origin
        Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
        X-Content-Type-Options: nosniff
        X-Frame-Options: SAMEORIGIN
        X-XSS-Protection: 1; mode=block
  headersOrigin: config
  redirects:
    - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
9:44:09 AM: Build failed due to a user error: Build script returned non-zero exit code: 2
9:44:09 AM: Failing build: Failed to build site
9:44:10 AM: Finished processing build request in 41.882s
oStore';
import './VideoFeed.css';

const VideoCard = observer(({ video }) => {
    const videoRef = useRef(null);
    const navigate = useNavigate();
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

        setTimeout(() => {
            setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 1000);
    };

    useEffect(() => {
        const options = { threshold: 0.7 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch(() => {
                        // If autoplay fails, it might need user interaction
                        console.log("Interaction needed to play");
                    });
                } else {
                    videoRef.current?.pause();
                }
            });
        }, options);

        if (videoRef.current) observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, [video.url]);

    return (
        <div className="video-card" onDoubleClick={handleDoubleClick}>
            <video
                ref={videoRef}
                src={video.url}
                loop
                muted
                playsInline
                autoPlay
                className="video-element"
                onClick={(e) => {
                    e.stopPropagation();
                    if (videoRef.current?.paused) videoRef.current.play();
                    else videoRef.current?.pause();
                }}
            />

            {hearts.map(heart => (
                <div key={heart.id} className="floating-heart" style={{ left: heart.x, top: heart.y }}>❤️</div>
            ))}

            <div className="video-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="sidebar-item" onClick={(e) => e.stopPropagation()}>
                    <div className="author-disc">
                        <span style={{ fontSize: '20px' }}>👤</span>
                        <div
                            className={`follow-btn ${videoStore.following.has(video.author) ? 'following' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                videoStore.toggleFollow(video.author);
                            }}
                            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                        >
                            {videoStore.following.has(video.author) ? '✓' : '+'}
                        </div>
                    </div>
                </div>

                <div className="sidebar-item" onClick={(e) => { e.stopPropagation(); videoStore.toggleLike(video.id); }} style={{ cursor: 'pointer' }}>
                    <div className={`sidebar-icon ${video.isLiked ? 'liked' : ''}`}>❤️</div>
                    <span className="sidebar-count">{video.likes}</span>
                </div>

                <div className="sidebar-item" onClick={(e) => { e.stopPropagation(); setShowComments(true); }} style={{ cursor: 'pointer' }}>
                    <div className="sidebar-icon">💬</div>
                    <span className="sidebar-count">{video.comments.length}</span>
                </div>

                <div className="sidebar-item" onClick={(e) => { e.stopPropagation(); videoStore.toggleSaved(video.id); }} style={{ cursor: 'pointer' }}>
                    <div className={`sidebar-icon ${video.isSaved ? 'liked' : ''}`}>✨</div>
                    <span className="sidebar-count">{video.isSaved ? 'Saved' : 'Save'}</span>
                </div>

                <div className="sidebar-item" onClick={(e) => { e.stopPropagation(); setShowShare(true); }} style={{ cursor: 'pointer' }}>
                    <div className="sidebar-icon">↪️</div>
                    <span className="sidebar-count">{video.shares}</span>
                </div>

                <div className="sidebar-item" onClick={(e) => { e.stopPropagation(); alert(`Now playing: ${video.music}`); }} style={{ cursor: 'pointer' }}>
                    <div className="music-disc"></div>
                </div>
            </div>

            <div className="video-footer" onClick={(e) => { e.stopPropagation(); navigate(`/profile/${video.author}`); }} style={{ cursor: 'pointer' }}>
                <h4>@{video.author}</h4>
                <p>{video.description}</p>
                <div className="music-ticker">
                    <span>🎵 {video.music}</span>
                </div>
            </div>

            {/* Modal overlays should stop propagation to root but be clickable themselves */}
            <div className={`comments-modal ${showComments ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                    <strong>{video.comments.length} comments</strong>
                    <span
                        onClick={(e) => { e.stopPropagation(); setShowComments(false); }}
                        style={{ cursor: 'pointer', fontSize: '28px', padding: '10px' }}
                    >✕</span>
                </div>
                <div style={{ overflowY: 'auto', height: '100%', paddingBottom: '30px' }}>
                    {video.comments.map(c => (
                        <div key={c.id} className="comment-item">
                            <div className="comment-user">@{c.user}</div>
                            <div className="comment-text">{c.text}</div>
                        </div>
                    ))}
                    {video.comments.length === 0 && <p style={{ textAlign: 'center', opacity: 0.5, marginTop: '20px' }}>No comments yet.</p>}
                </div>
            </div>

            <div className={`share-modal ${showShare ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <strong>Share to</strong>
                </div>
                <div className="share-grid" style={{ padding: '25px 0' }}>
                    <div className="share-item" onClick={(e) => { e.stopPropagation(); alert('Link Copied!'); setShowShare(false); }}>
                        <div className="share-icon">🔗</div>
                        <span>Copy Link</span>
                    </div>
                    <div className="share-item" onClick={(e) => { e.stopPropagation(); setShowShare(false); }}>
                        <div className="share-icon" style={{ backgroundColor: '#25D366', color: 'white' }}>💬</div>
                        <span>WhatsApp</span>
                    </div>
                    <div className="share-item" onClick={(e) => { e.stopPropagation(); setShowShare(false); }}>
                        <div className="share-icon" style={{ backgroundColor: '#1877F2', color: 'white' }}>f</div>
                        <span>Facebook</span>
                    </div>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); setShowShare(false); }}
                    style={{ width: '100%', padding: '15px', border: 'none', background: '#f5f5f5', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}
                >
                    Cancel
                </button>
            </div>
        </div >
    );
});

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

    return (
        <div style={{ backgroundColor: '#000', height: '100vh', overflow: 'hidden', position: 'relative' }}>
            {videoStore.loading && videoStore.videos.length === 0 && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
                    <div className="loading-spinner">Loading Douyin...</div>
                </div>
            )}

            <header className="feed-header">
                <div
                    style={{ position: 'absolute', left: '20px', color: '#ff3b5c', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={(e) => { e.stopPropagation(); alert('LIVE mode is currently a placeholder!'); }}
                >LIVE</div>
                <div
                    className={`header-item ${videoStore.feedType === 'following' ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); videoStore.setFeedType('following'); }}
                    style={{ cursor: 'pointer' }}
                >Following</div>
                <div
                    className={`header-item ${videoStore.feedType === 'forYou' ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); videoStore.setFeedType('forYou'); }}
                    style={{ cursor: 'pointer' }}
                >For You</div>
            </header>

            <div className="video-container" onScroll={handleScroll}>
                {videoStore.filteredVideos.length === 0 ? (
                    <div style={{ color: 'white', textAlign: 'center', marginTop: '100px', padding: '20px' }}>
                        {videoStore.feedType === 'following' ? (
                            <>
                                <h3>Start following creators!</h3>
                                <p style={{ opacity: 0.6 }}>Follow someone to see their latest videos here.</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
                                    {['cyberpunk_queen', 'nature_vibe', 'blue_dancer'].map(author => (
                                        <div key={author} style={{ backgroundColor: '#111', padding: '15px', borderRadius: '10px', border: '1px solid #333' }}>
                                            <div style={{ fontSize: '30px', marginBottom: '10px' }}>👤</div>
                                            <div style={{ fontWeight: 'bold' }}>@{author}</div>
                                            <button
                                                onClick={() => videoStore.toggleFollow(author)}
                                                style={{ marginTop: '10px', backgroundColor: '#ff3b5c', border: 'none', color: 'white', padding: '5px 15px', borderRadius: '4px' }}
                                            >
                                                {videoStore.following.has(author) ? 'Following' : 'Follow'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <p>No videos yet.</p>
                                <Link to="/upload" style={{ color: '#ff3b5c' }}>Upload one!</Link>
                            </>
                        )}
                    </div>
                ) : (
                    videoStore.filteredVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))
                )}
            </div>

            <nav className="bottom-nav">
                <div className="nav-item active" onClick={(e) => { e.stopPropagation(); navigate('/'); }}>Home</div>
                <div className="nav-item" onClick={(e) => { e.stopPropagation(); navigate('/search'); }}>Friends</div>
                <div className="nav-add-btn" onClick={(e) => { e.stopPropagation(); navigate('/upload'); }}>+</div>
                <div className="nav-item" onClick={(e) => { e.stopPropagation(); navigate('/inbox'); }}>Inbox</div>
                <div className="nav-item" onClick={(e) => { e.stopPropagation(); navigate('/profile/me'); }}>Profile</div>
            </nav>
        </div>
    );
});

export default VideoFeed;
