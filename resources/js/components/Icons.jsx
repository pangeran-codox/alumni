import React from 'react';

const base = 'w-[1em] h-[1em] inline-block shrink-0';

const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const IconSearch = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </svg>
);

export const IconArrowDown = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <path d="M19 14 12 21m0 0-7-7m7 7V3" />
    </svg>
);

export const IconSparkle = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
    </svg>
);

export const IconUsers = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.6 19.5c.6-2.8 2.9-4.8 6.4-4.8s5.8 2 6.4 4.8" />
        <circle cx="17" cy="9.5" r="2.5" />
        <path d="M15.5 15.5c2.5.2 4.4 1.8 5 3.7" />
    </svg>
);

export const IconCap = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <path d="M2.5 10 12 5l9.5 5L12 15 2.5 10Z" />
        <path d="M6 12v4.3c1.4 1.1 4 2 6 2s4.6-.9 6-2V12" />
    </svg>
);

export const IconPin = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <path d="M12 22s6-6.2 6-11a6 6 0 1 0-12 0c0 4.8 6 11 6 11Z" />
        <circle cx="12" cy="11" r="2.2" />
    </svg>
);

export const IconBrief = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
);

export const IconChevron = ({ className = '', dir = 'right' }) => {
    const rot = { right: 0, down: 90, left: 180, up: -90 }[dir] ?? 0;
    return (
        <svg viewBox="0 0 24 24" className={`${base} ${className}`} style={{ transform: `rotate(${rot}deg)` }} {...P}>
            <path d="m9 6 6 6-6 6" />
        </svg>
    );
};

export const IconReset = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5" />
    </svg>
);

export const IconCheck = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <path d="m5 12 4.5 4.5L19 7" />
    </svg>
);

export const IconMenu = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
);

export const IconHeart = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} {...P}>
        <path d="M12 20s-6.5-4.5-8.5-8.7A4.8 4.8 0 0 1 12 7.3 4.8 4.8 0 0 1 20.5 11.3C18.5 15.5 12 20 12 20Z" />
    </svg>
);
