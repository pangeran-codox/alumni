import React from 'react';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer
            className="relative overflow-hidden"
            style={{
                background:
                    'linear-gradient(180deg, #0B1220 0%, #070A13 100%)',
            }}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
                style={{
                    background:
                        'linear-gradient(90deg, transparent, rgba(212,175,55,.55), transparent)',
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full blur-3xl opacity-40"
                style={{ background: 'radial-gradient(circle,rgba(212,175,55,.35),transparent 60%)' }}
            />

            <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-xl"
                                style={{
                                    background:
                                        'linear-gradient(135deg,#DEC364 0%,#D4AF37 50%,#C69C1F 100%)',
                                    boxShadow:
                                        '0 10px 24px -10px rgba(212,175,55,.6), inset 0 1px 0 rgba(255,255,255,.5)',
                                }}
                            >
                                <span
                                    className="font-serif font-bold"
                                    style={{ color: '#070A13', fontSize: 16 }}
                                >
                                    AM
                                </span>
                            </div>
                            <div>
                                <p className="font-serif text-lg font-semibold text-white">
                                    Alumni Directory
                                </p>
                                <p
                                    className="text-[11px] uppercase tracking-[0.22em]"
                                    style={{ color: 'rgba(251,246,228,.5)' }}
                                >
                                    Est. Since Day One
                                </p>
                            </div>
                        </div>
                        <p
                            className="mt-4 max-w-md text-sm leading-relaxed"
                            style={{ color: 'rgba(251,246,228,.62)' }}
                        >
                            Wadah resmi untuk menelusuri dan menyambungkan kembali jejak
                            para alumni. Data yang ditampilkan hanya milik alumni yang
                            telah melewati proses verifikasi admin.
                        </p>
                    </div>

                    <div>
                        <p
                            className="text-[11px] uppercase tracking-[0.2em] mb-4"
                            style={{ color: '#DEC364' }}
                        >
                            Navigasi
                        </p>
                        <ul className="space-y-3 text-sm">
                            {[
                                { href: '#top', label: 'Beranda' },
                                { href: '#stats', label: 'Statistik' },
                                { href: '#direktori', label: 'Direktori Alumni' },
                                { href: '#about', label: 'Tentang' },
                            ].map((x) => (
                                <li key={x.href}>
                                    <a
                                        href={x.href}
                                        className="link-underline-magic"
                                        style={{ color: 'rgba(251,246,228,.72)' }}
                                    >
                                        {x.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p
                            className="text-[11px] uppercase tracking-[0.2em] mb-4"
                            style={{ color: '#DEC364' }}
                        >
                            Admin
                        </p>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="/admin/login"
                                    className="link-underline-magic"
                                    style={{ color: 'rgba(251,246,228,.72)' }}
                                >
                                    Login Admin
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/admin"
                                    className="link-underline-magic"
                                    style={{ color: 'rgba(251,246,228,.72)' }}
                                >
                                    Panel Manajemen
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div
                    className="mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    style={{
                        borderTop: '1px solid rgba(255,255,255,.08)',
                    }}
                >
                    <p className="text-xs" style={{ color: 'rgba(251,246,228,.45)' }}>
                        &copy; {year} Alumni Directory · Dibuat dengan hati untuk para alumni.
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(251,246,228,.45)' }}>
                        Semua data alumni terverifikasi oleh administrator.
                    </p>
                </div>
            </div>
        </footer>
    );
}
