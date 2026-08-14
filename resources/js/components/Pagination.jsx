import React from 'react';
import { IconChevron } from './Icons.jsx';

export default function Pagination({ meta, onPage, currentPage }) {
    if (!meta || !meta.last_page || meta.last_page <= 1) return null;

    const { last_page, total } = meta;
    const pages = [];
    const delta = 1;

    for (let i = 1; i <= last_page; i++) {
        if (
            i === 1 ||
            i === last_page ||
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            pages.push(i);
        } else if (pages[pages.length - 1] !== '…') {
            pages.push('…');
        }
    }

    const baseBtn =
        'group relative inline-flex min-w-[40px] h-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition-all duration-300 select-none';

    return (
        <nav className="mt-12 flex flex-col items-center gap-4">
            <p className="text-xs" style={{ color: 'rgba(11,18,32,.5)' }}>
                Menampilkan halaman{' '}
                <span className="font-semibold text-ink-900">{currentPage}</span> dari{' '}
                <span className="font-semibold text-ink-900">{last_page}</span>
                {typeof total === 'number' && (
                    <>
                        {' '}
                        &middot; Total{' '}
                        <span className="font-semibold text-ink-900">
                            {new Intl.NumberFormat('id-ID').format(total)}
                        </span>{' '}
                        data
                    </>
                )}
            </p>

            <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                    onClick={() => onPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`${baseBtn} border border-ink-900/10 text-ink-700 bg-white hover:bg-paper disabled:opacity-40 disabled:cursor-not-allowed hover:border-gold-400`}
                    style={{ transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)' }}
                >
                    <IconChevron dir="left" className="mr-0.5" style={{ width: 14, height: 14 }} />
                    <span className="hidden sm:inline">Sebelumnya</span>
                </button>

                {pages.map((p, idx) =>
                    p === '…' ? (
                        <span
                            key={`dot-${idx}`}
                            className="inline-flex h-10 items-center px-1 text-sm text-ink-700/50"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPage(p)}
                            aria-current={p === currentPage ? 'page' : undefined}
                            className={`${baseBtn} ${
                                p === currentPage
                                    ? 'text-ink-950 border-transparent shadow-[0_10px_30px_-12px_rgba(212,175,55,.65)]'
                                    : 'border border-ink-900/10 text-ink-700 bg-white hover:bg-paper hover:border-gold-400'
                            }`}
                            style={
                                p === currentPage
                                    ? {
                                          background:
                                              'linear-gradient(135deg,#DEC364 0%,#D4AF37 50%,#C69C1F 100%)',
                                      }
                                    : undefined
                            }
                        >
                            {p}
                        </button>
                    ),
                )}

                <button
                    onClick={() => onPage(currentPage + 1)}
                    disabled={currentPage >= last_page}
                    className={`${baseBtn} border border-ink-900/10 text-ink-700 bg-white hover:bg-paper disabled:opacity-40 disabled:cursor-not-allowed hover:border-gold-400`}
                >
                    <span className="hidden sm:inline">Berikutnya</span>
                    <IconChevron dir="right" className="ml-0.5" style={{ width: 14, height: 14 }} />
                </button>
            </div>
        </nav>
    );
}
