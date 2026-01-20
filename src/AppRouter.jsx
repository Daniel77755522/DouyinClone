import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoFeed from './components/VideoFeed';
import Profile from './components/Profile';
import Search from './components/Search';
import Upload from './components/Upload';
import Inbox from './components/Inbox';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VideoFeed />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
