import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import AlumniDirectory from './AlumniDirectory.jsx';
import About from './About.jsx';
import Footer from './Footer.jsx';
import { getAlumniStats } from '../api.js';

const THEME_COLORS = {
    ink900: '#0B1220',
    gold: '#D4AF37',
};

export default function App() {
    const [stats, setStats] = useState({ total: 0, angkatan: 0, kota: 0 });
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState(null);

    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            const el = document.createElement('meta');
            el.name = 'theme-color';
            el.content = THEME_COLORS.ink900;
            document.head.appendChild(el);
        } else {
            meta.setAttribute('content', THEME_COLORS.ink900);
        }
    }, []);

    useEffect(() => {
        getAlumniStats()
            .then((data) => setStats(data))
            .catch((e) => setStatsError(e.message))
            .finally(() => setStatsLoading(false));
    }, []);

    return (
        <div className="min-h-screen" style={{ background: '#FBF8F2', color: '#0B1220' }}>
            <Header />
            <main>
                <Hero stats={stats} loading={statsLoading} error={statsError} />
                <AlumniDirectory />
                <About />
            </main>
            <Footer />
        </div>
    );
}
