import '../css/app.css';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
