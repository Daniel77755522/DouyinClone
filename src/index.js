// Polyfills for broad browser support
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// PrismJS for code highlighting (as requested)
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';
import './index.css';

const AppRoot = () => {
    useEffect(() => {
        // Initialize PrismJS highlighting
        Prism.highlightAll();
    }, []);

    return <AppRouter />;
};

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppRoot />
    </React.StrictMode>
);
