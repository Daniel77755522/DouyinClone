import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from './stores/userStore';
import VideoFeed from './components/VideoFeed';
import Profile from './components/Profile';
import Search from './components/Search';
import Upload from './components/Upload';
import Inbox from './components/Inbox';
import Login from './components/Login';

const AppRouter = observer(() => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<VideoFeed />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/upload" element={userStore.isAuthenticated ? <Upload /> : <Navigate to="/login" />} />
                <Route path="/inbox" element={userStore.isAuthenticated ? <Inbox /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
});

export default AppRouter;
