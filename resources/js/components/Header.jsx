import React, { useEffect, useState } from 'react';
import { IconSparkle, IconSearch } from './Icons.jsx';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-40 transition-all duration-700 ${
                scrolled
                    ? 'backdrop-blur-xl bg-[rgba(7,10,19,0.72)] border-b border-white/10'
                    : 'bg-transparent border-b border-transparent'
            }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 sm:py-4">
                <a href="#top" className="group flex items-center gap-3">
                    <div
                        className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
                        style={{
                            background:
                                'linear-gradient(135deg,#DEC364 0%,#D4AF37 50%,#C69C1F 100%)',
                            boxShadow:
                                '0 8px 24px -8px rgba(212,175,55,.55), inset 0 1px 0 rgba(255,255,255,.5)',
                        }}
                    >
                        <span
                            className="font-serif text-[15px] font-bold select-none"
                            style={{ color: '#070A13' }}
                        >
                            AM
                        </span>
                        <IconSparkle
                            className="absolute -right-1.5 -top-1.5 text-white drop-shadow"
                            style={{ width: 12, height: 12 }}
                        />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span
                            className="font-serif text-sm font-semibold transition-colors duration-500"
                            style={{ color: scrolled ? '#FBF6E4' : '#F5ECC5' }}
                        >
                            Alumni
                        </span>
                        <span
                            className="text-[10px] uppercase tracking-[0.22em] transition-opacity duration-500"
                            style={{
                                color: scrolled ? 'rgba(251,246,228,.6)' : 'rgba(251,246,228,.45)',
                            }}
                        >
                            Directory · Est.
                        </span>
                    </div>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    <a
                        href="#direktori"
                        className="text-sm link-underline-magic"
                        style={{ color: 'rgba(251,246,228,.78)' }}
                    >
                        Direktori
                    </a>
                    <a
                        href="#stats"
                        className="text-sm link-underline-magic"
                        style={{ color: 'rgba(251,246,228,.78)' }}
                    >
                        Statistik
                    </a>
                    <a
                        href="#about"
                        className="text-sm link-underline-magic"
                        style={{ color: 'rgba(251,246,228,.78)' }}
                    >
                        Tentang
                    </a>
                </nav>

                <a
                    href="#direktori"
                    className="group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-500 hover:scale-[1.02] animate-pulse-glow"
                    style={{
                        borderColor: scrolled ? 'rgba(212,175,55,.55)' : 'rgba(255,255,255,.18)',
                        color: scrolled ? '#FBF6E4' : 'rgba(251,246,228,.88)',
                        background: scrolled ? 'rgba(212,175,55,.10)' : 'rgba(255,255,255,.04)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <IconSearch className="opacity-80" style={{ width: 14, height: 14 }} />
                    <span>Cari alumni</span>
                </a>
            </div>
        </header>
    );
}
