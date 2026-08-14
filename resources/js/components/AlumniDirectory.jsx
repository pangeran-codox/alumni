import React, { useEffect, useRef, useState } from 'react';
import AlumniCard, { AlumniCardSkeleton } from './AlumniCard.jsx';
import Pagination from './Pagination.jsx';
import { Reveal } from '../hooks/useReveal.jsx';
import { getAlumni, getFilters } from '../api.js';
import { IconSearch, IconReset, IconSparkle } from './Icons.jsx';

export default function AlumniDirectory() {
    const [q, setQ] = useState('');
    const [tahunLulus, setTahunLulus] = useState('');
    const [jurusan, setJurusan] = useState('');
    const [page, setPage] = useState(1);

    const [filters, setFilters] = useState({ tahunLulus: [], jurusan: [] });
    const [filtersLoading, setFiltersLoading] = useState(true);

    const [data, setData] = useState({ data: [], meta: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const appliedRef = useRef({ q: '', tahunLulus: '', jurusan: '', page: 1 });

    useEffect(() => {
        getFilters()
            .then((d) => setFilters(d))
            .finally(() => setFiltersLoading(false));
    }, []);

    const fetchData = (params, resetMeta = false) => {
        setLoading(true);
        setError(null);
        if (resetMeta) setData((d) => ({ ...d, meta: null }));
        getAlumni(params)
            .then((res) => {
                setData({ data: res.data, meta: res.meta });
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData(appliedRef.current, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (e) => {
        if (e) e.preventDefault();
        const params = { q, tahun_lulus: tahunLulus, jurusan, page: 1 };
        appliedRef.current = {
            q,
            tahunLulus,
            jurusan,
            page: 1,
        };
        setPage(1);
        fetchData(params, true);
    };

    const onChip = (type, value) => {
        if (type === 'tahun') {
            setTahunLulus(value);
            appliedRef.current = { ...appliedRef.current, tahunLulus: value, page: 1 };
            setPage(1);
            fetchData(
                {
                    q: appliedRef.current.q,
                    tahun_lulus: value,
                    jurusan: appliedRef.current.jurusan,
                    page: 1,
                },
                true,
            );
        } else if (type === 'jurusan') {
            setJurusan(value);
            appliedRef.current = { ...appliedRef.current, jurusan: value, page: 1 };
            setPage(1);
            fetchData(
                {
                    q: appliedRef.current.q,
                    tahun_lulus: appliedRef.current.tahunLulus,
                    jurusan: value,
                    page: 1,
                },
                true,
            );
        }
    };

    const onReset = (e) => {
        e.preventDefault();
        setQ('');
        setTahunLulus('');
        setJurusan('');
        setPage(1);
        appliedRef.current = { q: '', tahunLulus: '', jurusan: '', page: 1 };
        fetchData({ page: 1 }, true);
    };

    const onPage = (p) => {
        const params = {
            q: appliedRef.current.q,
            tahun_lulus: appliedRef.current.tahunLulus,
            jurusan: appliedRef.current.jurusan,
            page: p,
        };
        appliedRef.current = { ...appliedRef.current, page: p };
        setPage(p);
        fetchData(params);
        const el = document.getElementById('direktori');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const hasFilter = Boolean(q || tahunLulus || jurusan);
    const activeCount =
        (q ? 1 : 0) + (tahunLulus ? 1 : 0) + (jurusan ? 1 : 0);

    const quickTahun = filters.tahunLulus.slice(0, 6);
    const quickJurusan = filters.jurusan.slice(0, 6);

    return (
        <section
            id="direktori"
            className="relative scroll-mt-24 pb-20"
            style={{ background: '#FBF8F2' }}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-40"
                style={{
                    background:
                        'linear-gradient(180deg, #F6F1E7 0%, rgba(251,248,242,0) 100%)',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-6 pt-12">
                <Reveal>
                    <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3"
                                style={{ background: 'rgba(212,175,55,.14)' }}
                            >
                                <IconSparkle
                                    style={{ width: 12, height: 12, color: '#A57F17' }}
                                />
                                <span
                                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                                    style={{ color: '#A57F17' }}
                                >
                                    Direktori Alumni
                                </span>
                            </div>
                            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900 text-balance leading-tight">
                                Jelajahi{' '}
                                <span style={{ color: '#C69C1F' }}>kenangan</span> &{' '}
                                <span style={{ color: '#C69C1F' }}>jejak karier</span>{' '}
                                bersama
                            </h2>
                            <p className="mt-2 text-sm text-ink-700/70 max-w-xl">
                                Cari berdasarkan nama, tahun lulus, atau jurusan untuk mempersempit
                                hasil. Semua data yang tampil hanya alumni yang telah{' '}
                                <span className="font-semibold text-ink-900">
                                    terverifikasi
                                </span>
                                .
                            </p>
                        </div>
                        {activeCount > 0 && (
                            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold animate-count-in"
                                style={{
                                    background:
                                        'linear-gradient(135deg, rgba(212,175,55,.16), rgba(212,175,55,.06))',
                                    color: '#7A6312',
                                    border: '1px solid rgba(212,175,55,.35)',
                                }}
                            >
                                {activeCount} filter aktif
                            </div>
                        )}
                    </div>
                </Reveal>

                <Reveal delay={80}>
                    <form
                        onSubmit={onSubmit}
                        className="glass-light relative rounded-3xl p-5 sm:p-6"
                        style={{ boxShadow: 'var(--shadow-card)' }}
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <label className="input-premium group flex min-w-[240px] flex-1 items-center gap-3 rounded-2xl border border-ink-900/10 bg-white px-4 py-3">
                                <span
                                    className="flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, rgba(212,175,55,.2), rgba(212,175,55,.06))',
                                        color: '#A57F17',
                                    }}
                                >
                                    <IconSearch style={{ width: 15, height: 15 }} />
                                </span>
                                <input
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Cari nama alumni..."
                                    className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-700/40 focus:outline-none focus:ring-0"
                                />
                                {q && (
                                    <button
                                        type="button"
                                        onClick={() => setQ('')}
                                        aria-label="Hapus pencarian"
                                        className="text-xs text-ink-700/50 hover:text-ink-900 transition-colors"
                                    >
                                        ✕
                                    </button>
                                )}
                            </label>

                            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[240px] sm:min-w-0 sm:flex-none">
                                <div className="relative">
                                    <select
                                        value={tahunLulus}
                                        onChange={(e) => setTahunLulus(e.target.value)}
                                        className="input-premium appearance-none rounded-2xl border border-ink-900/10 bg-white py-3 pl-4 pr-10 text-sm text-ink-700 focus:outline-none focus:ring-0 min-w-[170px] h-[52px]"
                                        disabled={filtersLoading}
                                    >
                                        <option value="">Semua tahun lulus</option>
                                        {filters.tahunLulus.map((t) => (
                                            <option key={t} value={t}>
                                                Tahun {t}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-700/40"
                                        style={{ fontSize: 10 }}
                                    >
                                        ▾
                                    </span>
                                </div>

                                <div className="relative">
                                    <select
                                        value={jurusan}
                                        onChange={(e) => setJurusan(e.target.value)}
                                        className="input-premium appearance-none rounded-2xl border border-ink-900/10 bg-white py-3 pl-4 pr-10 text-sm text-ink-700 focus:outline-none focus:ring-0 min-w-[190px] h-[52px]"
                                        disabled={filtersLoading}
                                    >
                                        <option value="">Semua jurusan</option>
                                        {filters.jurusan.map((j) => (
                                            <option key={j} value={j}>
                                                {j}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-700/40"
                                        style={{ fontSize: 10 }}
                                    >
                                        ▾
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-gold inline-flex items-center gap-2 rounded-2xl px-5 h-[52px] text-sm font-semibold"
                                >
                                    Terapkan
                                </button>

                                {hasFilter && (
                                    <button
                                        type="button"
                                        onClick={onReset}
                                        className="inline-flex h-[52px] items-center gap-1.5 rounded-2xl border border-ink-900/10 bg-white px-4 text-sm font-medium text-ink-700 transition-all duration-300 hover:bg-paper hover:border-gold-400 hover:text-ink-900"
                                    >
                                        <IconReset style={{ width: 14, height: 14 }} />
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>

                        {(quickTahun.length > 0 || quickJurusan.length > 0) && (
                            <div className="mt-5 pt-5 border-t border-ink-900/5 space-y-3">
                                {quickTahun.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[11px] uppercase tracking-[0.14em] text-ink-700/50 font-semibold w-20 sm:w-24 shrink-0">
                                            Tahun ·
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onChip('tahun', '')}
                                                className={`chip-light transition-transform duration-300 hover:scale-[1.04] ${
                                                    !tahunLulus
                                                        ? '!bg-ink-900 !text-white !border-transparent'
                                                        : ''
                                                }`}
                                            >
                                                Semua
                                            </button>
                                            {quickTahun.map((t) => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => onChip('tahun', String(t))}
                                                    className={`chip-light transition-transform duration-300 hover:scale-[1.04] ${
                                                        String(tahunLulus) === String(t)
                                                            ? '!bg-ink-900 !text-white !border-transparent'
                                                            : ''
                                                    }`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {quickJurusan.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[11px] uppercase tracking-[0.14em] text-ink-700/50 font-semibold w-20 sm:w-24 shrink-0">
                                            Jurusan ·
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onChip('jurusan', '')}
                                                className={`chip-light transition-transform duration-300 hover:scale-[1.04] ${
                                                    !jurusan
                                                        ? '!bg-ink-900 !text-white !border-transparent'
                                                        : ''
                                                }`}
                                            >
                                                Semua
                                            </button>
                                            {quickJurusan.map((j) => (
                                                <button
                                                    key={j}
                                                    type="button"
                                                    onClick={() => onChip('jurusan', j)}
                                                    className={`chip-light transition-transform duration-300 hover:scale-[1.04] ${
                                                        jurusan === j
                                                            ? '!bg-ink-900 !text-white !border-transparent'
                                                            : ''
                                                    }`}
                                                >
                                                    <span className="truncate max-w-[160px]">
                                                        {j}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                </Reveal>

                <div className="mt-10">
                    {loading && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <AlumniCardSkeleton key={i} index={i} />
                            ))}
                        </div>
                    )}

                    {!loading && error && (
                        <div
                            className="rounded-3xl border p-10 text-center animate-fade-up"
                            style={{
                                borderColor: 'rgba(220, 38, 38, 0.18)',
                                background:
                                    'linear-gradient(180deg, rgba(254, 242, 242, 0.7), rgba(254, 242, 242, 0.3))',
                                color: '#7f1d1d',
                            }}
                        >
                            <p className="font-serif text-xl font-semibold">
                                Maaf, sepertinya terjadi kendala.
                            </p>
                            <p className="mt-2 text-sm opacity-80">{error}</p>
                        </div>
                    )}

                    {!loading && !error && data.data.length === 0 && (
                        <div className="rounded-3xl border border-dashed border-ink-900/15 bg-white/70 p-14 text-center backdrop-blur animate-fade-up">
                            <div
                                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                                style={{
                                    background:
                                        'linear-gradient(135deg, rgba(212,175,55,.20), rgba(212,175,55,.06))',
                                    color: '#A57F17',
                                }}
                            >
                                <IconSearch style={{ width: 22, height: 22 }} />
                            </div>
                            <p className="font-serif text-2xl font-semibold text-ink-900">
                                Tidak ada alumni yang cocok
                            </p>
                            <p className="mt-2 text-sm text-ink-700/70">
                                Coba hapus filter atau cari dengan kata kunci yang berbeda.
                            </p>
                            {hasFilter && (
                                <button
                                    onClick={onReset}
                                    className="btn-gold mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                                >
                                    <IconReset style={{ width: 14, height: 14 }} />
                                    Reset semua filter
                                </button>
                            )}
                        </div>
                    )}

                    {!loading && !error && data.data.length > 0 && (
                        <>
                            <div
                                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                                style={{
                                    alignItems: 'stretch',
                                }}
                            >
                                {data.data.map((item, i) => (
                                    <div
                                        key={item.id}
                                        className="reveal is-visible h-full"
                                        style={{
                                            transitionDelay: `${(i % 12) * 45}ms`,
                                            display: 'flex',
                                        }}
                                    >
                                        <div className="flex-1">
                                            <AlumniCard item={item} index={i} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Pagination
                                meta={data.meta}
                                currentPage={page}
                                onPage={onPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
