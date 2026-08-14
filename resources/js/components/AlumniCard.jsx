import React from 'react';
import { useTilt } from '../hooks/useTilt.js';
import { IconBrief, IconPin, IconCap } from './Icons.jsx';

const getInitials = (name) => {
    if (!name) return '—';
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '—';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function AlumniCard({ item, index = 0 }) {
    const tilt = useTilt({ max: 7, perspective: 1000, scale: 1.02 });
    const tahunSingkat = item.tahun_lulus
        ? `'${String(item.tahun_lulus).slice(2)}`
        : '—';

    const jurusan = item.jurusan || '—';
    const pekerjaan = item.pekerjaan;
    const kota = item.kota_domisili;
    const angkatanTahun = item.angkatan?.tahun;

    const hue = (index * 37) % 360;

    return (
        <article
            {...tilt}
            ref={tilt.ref}
            className="tilt card-border-gradient relative rounded-2xl p-[1px]"
            style={{
                transitionDelay: `${(index % 12) * 35}ms`,
            }}
        >
            <div className="relative h-full rounded-[calc(1rem-1px)] bg-white p-5 overflow-hidden">
                <div
                    className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle, hsla(${hue}, 55%, 60%, .20), transparent 60%)`,
                    }}
                    aria-hidden
                />

                <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                        <div
                            className="flex h-14 w-14 items-center justify-center rounded-2xl font-serif text-sm font-bold text-white select-none"
                            style={{
                                background:
                                    'linear-gradient(135deg, #0B1220 0%, #1A2441 55%, #263256 100%)',
                                boxShadow:
                                    '0 10px 24px -10px rgba(11,18,32,.55), inset 0 1px 0 rgba(255,255,255,.08)',
                            }}
                        >
                            {getInitials(item.nama_lengkap)}
                        </div>
                        <div
                            className="absolute -bottom-1 -right-1 rounded-full px-2 py-0.5 font-serif text-[10px] font-bold"
                            style={{
                                background:
                                    'linear-gradient(135deg,#DEC364,#D4AF37)',
                                color: '#070A13',
                                boxShadow:
                                    '0 6px 16px -6px rgba(212,175,55,.7)',
                            }}
                        >
                            {tahunSingkat}
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                            <h3
                                className="truncate font-serif text-[15px] font-semibold leading-tight text-ink-900"
                                title={item.nama_lengkap}
                            >
                                {item.nama_lengkap}
                            </h3>
                        </div>

                        <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
                            <span className="inline-flex items-center gap-1 text-ink-700/80">
                                <IconCap style={{ width: 12, height: 12, color: '#D4AF37' }} />
                                <span className="truncate max-w-[140px]">{jurusan}</span>
                            </span>
                            {angkatanTahun && (
                                <>
                                    <span className="text-ink-700/30">·</span>
                                    <span className="text-ink-700/70">Angkatan {angkatanTahun}</span>
                                </>
                            )}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {pekerjaan ? (
                                <span className="chip-light">
                                    <IconBrief style={{ width: 11, height: 11, color: '#A57F17' }} />
                                    <span className="truncate max-w-[150px]">{pekerjaan}</span>
                                </span>
                            ) : (
                                <span className="chip-light" style={{ opacity: .6 }}>
                                    <IconBrief style={{ width: 11, height: 11 }} />
                                    Pekerjaan —
                                </span>
                            )}
                            {kota ? (
                                <span className="chip-light">
                                    <IconPin style={{ width: 11, height: 11, color: '#A57F17' }} />
                                    <span className="truncate max-w-[120px]">{kota}</span>
                                </span>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-60"
                    style={{
                        background:
                            'linear-gradient(90deg, transparent, rgba(212,175,55,.45), transparent)',
                    }}
                />
            </div>
        </article>
    );
}

export function AlumniCardSkeleton({ index = 0 }) {
    return (
        <div
            className="rounded-2xl p-[1px]"
            style={{
                background:
                    'linear-gradient(135deg, rgba(11,18,32,.08), rgba(212,175,55,.25), rgba(11,18,32,.06))',
                animationDelay: `${(index % 9) * 80}ms`,
            }}
        >
            <div className="h-full rounded-[calc(1rem-1px)] bg-white p-5">
                <div className="flex items-start gap-4">
                    <div className="shimmer h-14 w-14 rounded-2xl" />
                    <div className="flex-1 space-y-2.5 pt-1">
                        <div className="shimmer h-4 w-3/4 rounded-md" />
                        <div className="shimmer h-3 w-1/2 rounded-md" />
                        <div className="shimmer h-6 w-2/3 rounded-full mt-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
