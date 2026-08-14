import React from 'react';
import { Reveal } from '../hooks/useReveal.jsx';
import { IconCap, IconUsers, IconHeart, IconSparkle } from './Icons.jsx';

const features = [
    {
        title: 'Data Terverifikasi',
        desc: 'Setiap profil alumni diperiksa dan diverifikasi oleh administrator sebelum ditampilkan ke publik.',
        icon: <IconSparkle style={{ width: 20, height: 20 }} />,
    },
    {
        title: 'Pencarian Realtime',
        desc: 'Temukan kenalan lama dengan cepat lewat nama, jurusan, tahun lulus, atau kota domisili.',
        icon: <IconUsers style={{ width: 20, height: 20 }} />,
    },
    {
        title: 'Riwayat Akademik',
        desc: 'Tahun masuk, tahun lulus, angkatan, dan program studi tercatat rapi per profil.',
        icon: <IconCap style={{ width: 20, height: 20 }} />,
    },
];

export default function About() {
    return (
        <section id="about" className="relative scroll-mt-24" style={{ background: '#F6F1E7' }}>
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-28"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(251,248,242,1) 0%, rgba(246,241,231,0) 100%)',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-6 py-20">
                <Reveal>
                    <div className="max-w-2xl">
                        <div
                            className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3"
                            style={{ background: 'rgba(11,18,32,.06)' }}
                        >
                            <IconHeart
                                style={{
                                    width: 12,
                                    height: 12,
                                    color: '#A57F17',
                                }}
                            />
                            <span
                                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                                style={{ color: '#6B5A14' }}
                            >
                                Tentang
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink-900 leading-tight text-balance">
                            Wadah yang{' '}
                            <span className="gold-text">elegan</span> untuk jejak
                            setiap perjalanan
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-ink-700/75 leading-relaxed max-w-xl">
                            Lebih dari sekadar direktori — ini ruang untuk mengenang,
                            terhubung kembali, dan merayakan setiap prestasi yang dibawa
                            oleh alumni ke dunia luar.
                        </p>
                    </div>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {features.map((f, i) => (
                        <Reveal key={f.title} delay={i * 100}>
                            <article className="card-border-gradient relative h-full rounded-3xl bg-white p-6 transition-all duration-500 hover:-translate-y-1">
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl mb-5"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, rgba(212,175,55,.22) 0%, rgba(212,175,55,.06) 100%)',
                                        color: '#A57F17',
                                        border: '1px solid rgba(212,175,55,.26)',
                                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7)',
                                    }}
                                >
                                    {f.icon}
                                </div>
                                <h3 className="font-serif text-xl font-semibold text-ink-900">
                                    {f.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-ink-700/70">
                                    {f.desc}
                                </p>
                                <div
                                    className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full opacity-50 blur-3xl"
                                    style={{
                                        background:
                                            'radial-gradient(circle, rgba(212,175,55,.26), transparent 60%)',
                                    }}
                                />
                            </article>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={200}>
                    <div className="relative overflow-hidden rounded-[28px] p-[1px] mt-16">
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(135deg, rgba(212,175,55,.65) 0%, rgba(11,18,32,.12) 40%, rgba(212,175,55,.5) 100%)',
                                opacity: .9,
                            }}
                        />
                        <div className="relative rounded-[calc(28px-1px)] overflow-hidden bg-premium-gradient noise-overlay">
                            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl opacity-60 float-mid"
                                style={{ background: 'radial-gradient(circle,rgba(212,175,55,.45),transparent 60%)' }}
                            />
                            <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full blur-3xl opacity-50 float-slow"
                                style={{ background: 'radial-gradient(circle,rgba(222,195,100,.35),transparent 60%)' }}
                            />
                            <div className="relative px-6 sm:px-10 py-14 sm:py-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                                <div className="max-w-2xl">
                                    <p
                                        className="text-[11px] uppercase tracking-[0.22em] mb-3"
                                        style={{ color: '#DEC364' }}
                                    >
                                        Ingin daftar sebagai alumni?
                                    </p>
                                    <h3 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-white text-balance">
                                        Bergabung dengan{' '}
                                        <span className="gold-text">jejang para alumni</span>{' '}
                                        yang sudah terdaftar.
                                    </h3>
                                    <p className="mt-3 text-sm sm:text-base" style={{ color: 'rgba(251,246,228,.66)' }}>
                                        Kirimkan data dirimu ke admin sekolah untuk ditambahkan ke
                                        direktori resmi ini. Data diverifikasi sebelum dipublikasikan.
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <a
                                        href="#direktori"
                                        className="btn-gold inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
                                    >
                                        Lihat Direktori
                                        <span className="transition-transform duration-500 group-hover:translate-x-0.5">
                                            →
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
