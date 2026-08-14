import React, { useMemo } from 'react';
import { useReveal, Reveal } from '../hooks/useReveal.jsx';
import { useCountUp } from '../hooks/useCountUp.js';
import { IconArrowDown, IconSparkle, IconUsers, IconCap, IconPin, IconCheck } from './Icons.jsx';

function StatCard({ label, value, icon, delay = 0 }) {
    const [ref, visible] = useReveal({ threshold: 0.3 });
    const n = useCountUp(value, { duration: 1800, startOn: visible });
    const display = useMemo(
        () => new Intl.NumberFormat('id-ID').format(n),
        [n],
    );
    return (
        <div
            ref={ref}
            className={`relative reveal card-border-gradient glass rounded-2xl p-6 transition-all duration-700 hover:-translate-y-1 ${
                visible ? 'is-visible' : ''
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="flex items-start gap-4">
                <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(212,175,55,.22) 0%, rgba(212,175,55,.08) 100%)',
                        color: '#F5ECC5',
                        border: '1px solid rgba(212,175,55,.28)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.08)',
                    }}
                >
                    {icon}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                        {label}
                    </p>
                    <p
                        className={`mt-1.5 font-serif text-3xl sm:text-4xl font-semibold leading-none gold-text ${
                            visible ? 'animate-count-in' : ''
                        }`}
                        style={{ animationDelay: `${delay + 150}ms` }}
                    >
                        {display}
                    </p>
                </div>
            </div>
            <div
                className="absolute -right-16 -top-10 h-40 w-40 rounded-full opacity-30 blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,.6), transparent 60%)' }}
            />
        </div>
    );
}

export default function Hero({ stats, loading, error }) {
    const s = loading || error ? { total: 0, angkatan: 0, kota: 0 } : stats;

    return (
        <section id="top" className="relative overflow-hidden bg-premium-gradient noise-overlay">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-60 blur-3xl pointer-events-none float-slow"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,.35), transparent 60%)' }}
            />
            <div className="absolute -right-28 top-24 h-80 w-80 rounded-full opacity-50 blur-3xl pointer-events-none float-mid"
                style={{ background: 'radial-gradient(circle, rgba(222,195,100,.28), transparent 60%)' }}
            />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full opacity-40 blur-3xl pointer-events-none float-fast"
                style={{ background: 'radial-gradient(circle, rgba(198,156,31,.22), transparent 60%)' }}
            />

            <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.07] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
                        <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#D4AF37" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
                <Reveal delay={100}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5"
                        style={{ background: 'rgba(255,255,255,.04)' }}
                    >
                        <span
                            className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                            style={{ background: 'rgba(212,175,55,.18)', color: '#F5ECC5' }}
                        >
                            <IconSparkle style={{ width: 12, height: 12 }} />
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                            Direktori Resmi &middot; Terverifikasi
                        </span>
                    </div>
                </Reveal>

                <Reveal delay={200} as="h1"
                    className="mt-7 max-w-4xl text-balance font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] text-white"
                >
                    Menyambungkan kembali{' '}
                    <span className="relative inline-block">
                        <span className="gold-text">jejak</span>
                        <svg
                            aria-hidden
                            viewBox="0 0 300 12"
                            className="absolute -bottom-2 left-0 w-full"
                            style={{ height: 10 }}
                        >
                            <path
                                d="M2 9 C 60 2, 150 2, 298 8"
                                fill="none"
                                stroke="url(#g)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
                                    <stop offset="0%" stopColor="#DEC364" stopOpacity="0.1" />
                                    <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.95" />
                                    <stop offset="100%" stopColor="#C69C1F" stopOpacity="0.2" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>{' '}
                    setiap alumni dalam satu direktori elegan.
                </Reveal>

                <Reveal delay={320} as="p"
                    className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed"
                    style={{ color: 'rgba(251,246,228,.68)' }}
                >
                    Temukan kenalan lama, lacak perjalanan karier, dan bagikan koneksi.
                    Ratusan alumni terverifikasi tersusun rapi — filter berdasarkan nama,
                    angkatan, jurusan, atau domisili.
                </Reveal>

                <Reveal delay={440} className="mt-9 flex flex-wrap items-center gap-4">
                    <a
                        href="#direktori"
                        className="btn-gold inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold"
                    >
                        Jelajahi direktori
                        <IconArrowDown style={{ width: 16, height: 16 }} />
                    </a>
                    <a
                        href="#stats"
                        className="group inline-flex items-center gap-2 rounded-xl border border-white/12 px-6 py-3.5 text-sm font-medium text-white/85 transition-all duration-500 hover:bg-white/5 hover:border-white/25"
                    >
                        Lihat statistik
                        <span className="transition-transform duration-500 group-hover:translate-x-1">
                            →
                        </span>
                    </a>
                </Reveal>

                <Reveal delay={560} className="mt-10 flex flex-wrap items-center gap-2.5">
                    {[
                        'Data terverifikasi',
                        'Pencarian realtime',
                        'Mobile friendly',
                        'Akses publik',
                    ].map((t) => (
                        <span key={t} className="chip">
                            <IconCheck style={{ width: 12, height: 12, color: '#D4AF37' }} />
                            {t}
                        </span>
                    ))}
                </Reveal>

                <div id="stats" className="mt-20 scroll-mt-24">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <StatCard
                            label="Alumni Terverifikasi"
                            value={s.total}
                            delay={100}
                            icon={<IconUsers style={{ width: 20, height: 20 }} />}
                        />
                        <StatCard
                            label="Angkatan Tercatat"
                            value={s.angkatan}
                            delay={220}
                            icon={<IconCap style={{ width: 20, height: 20 }} />}
                        />
                        <StatCard
                            label="Kota Domisili"
                            value={s.kota}
                            delay={340}
                            icon={<IconPin style={{ width: 20, height: 20 }} />}
                        />
                    </div>
                </div>
            </div>

            <svg aria-hidden viewBox="0 0 1440 64" className="relative block w-full" preserveAspectRatio="none" style={{ height: 48 }}>
                <path
                    d="M0,32 C320,64 640,0 960,24 C1200,42 1360,12 1440,28 L1440,64 L0,64 Z"
                    fill="#FBF8F2"
                />
            </svg>
        </section>
    );
}
