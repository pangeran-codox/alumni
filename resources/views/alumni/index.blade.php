<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Direktori Alumni — {{ config('app.name') }}</title>
    <meta name="description" content="Direktori alumni {{ config('app.name') }} — cari alumni berdasarkan nama, angkatan, atau jurusan.">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-50 text-gray-900">

    {{-- Nav --}}
    <header class="sticky top-0 z-20 border-b border-white/10 backdrop-blur" style="background:rgba(11,18,32,0.92)">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold" style="background:#D4AF37;color:#0B1220">
                    AM
                </div>
                <span class="font-serif text-sm font-semibold text-white">{{ config('app.name') }}</span>
            </div>
            <a href="#direktori" class="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white">
                Cari alumni
            </a>
        </div>
    </header>

    {{-- Hero --}}
    <section class="relative overflow-hidden" style="background:#0B1220">
        <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full" style="background:radial-gradient(circle,rgba(212,175,55,0.15),transparent 70%)"></div>
        <div class="pointer-events-none absolute inset-0" style="background-image:radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);background-size:28px 28px;mask-image:linear-gradient(to bottom, black, transparent 70%)"></div>

        <div class="relative mx-auto max-w-6xl px-6 py-20">
            <p class="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em]" style="color:#D4AF37">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.5L4.36 12 12 15.5 19.64 12 12 16.5zM5 13.18v4.68L12 21l7-3.14v-4.68L12 17l-7-3.82z"/>
                </svg>
                Direktori resmi
            </p>
            <h1 class="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Menyambungkan kembali jejak setiap alumni
            </h1>
            <p class="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                Satu tempat untuk menelusuri alumni {{ config('app.name') }} — cari berdasarkan nama,
                angkatan, atau jurusan, dan lihat ke mana perjalanan mereka membawa mereka.
            </p>
            <a href="#direktori" class="mt-8 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition hover:brightness-110" style="background:#D4AF37;color:#0B1220">
                Jelajahi direktori
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </a>

            <div class="mt-16 grid grid-cols-3 gap-4 border-t border-white/10 pt-10">
                <div>
                    <p class="font-serif text-2xl font-semibold text-white sm:text-3xl">{{ number_format($totalTerverifikasi) }}</p>
                    <p class="mt-1 text-xs text-white/50 sm:text-sm">Alumni terverifikasi</p>
                </div>
                <div>
                    <p class="font-serif text-2xl font-semibold text-white sm:text-3xl">{{ number_format($totalAngkatan) }}</p>
                    <p class="mt-1 text-xs text-white/50 sm:text-sm">Angkatan tercatat</p>
                </div>
                <div>
                    <p class="font-serif text-2xl font-semibold text-white sm:text-3xl">{{ number_format($totalKota) }}</p>
                    <p class="mt-1 text-xs text-white/50 sm:text-sm">Kota domisili</p>
                </div>
            </div>

            @if ($angkatanBreakdown->isNotEmpty() && $angkatanBreakdown->sum('alumni_count') > 0)
                @php $maxCount = max(1, $angkatanBreakdown->max('alumni_count')); @endphp
                <div class="mt-10 flex items-end gap-3 border-t border-white/10 pt-8 sm:gap-5">
                    @foreach ($angkatanBreakdown as $row)
                        <div class="flex flex-1 flex-col items-center gap-2">
                            <span class="text-[11px] text-white/50">{{ $row->alumni_count }}</span>
                            <div class="flex h-16 w-full items-end overflow-hidden rounded-t-md bg-white/5">
                                <div
                                    class="w-full rounded-t-md"
                                    style="height:{{ max(6, round(($row->alumni_count / $maxCount) * 100)) }}%;background:#D4AF37"
                                ></div>
                            </div>
                            <span class="text-[11px] font-medium text-white/60">{{ $row->tahun }}</span>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </section>

    {{-- Direktori --}}
    <main id="direktori" class="mx-auto max-w-6xl px-6 py-16">
        <div class="mb-8">
            <h2 class="font-serif text-2xl font-semibold text-gray-900">Cari alumni</h2>
            <p class="mt-1 text-sm text-gray-500">Gunakan nama, tahun lulus, atau jurusan untuk mempersempit pencarian.</p>
        </div>

        <form method="GET" action="{{ route('alumni.index') }}#direktori" class="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            <div class="flex flex-wrap items-center gap-3">
                <div class="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                        type="text"
                        name="q"
                        value="{{ request('q') }}"
                        placeholder="Cari nama alumni..."
                        class="w-full border-0 bg-transparent p-0 text-sm text-gray-700 focus:outline-none focus:ring-0"
                    >
                </div>

                <select name="tahun_lulus" class="rounded-lg border border-gray-200 py-2 pl-3 pr-8 text-sm text-gray-700">
                    <option value="">Semua tahun lulus</option>
                    @foreach ($tahunLulusOptions as $tahun)
                        <option value="{{ $tahun }}" @selected(request('tahun_lulus') == $tahun)>{{ $tahun }}</option>
                    @endforeach
                </select>

                {{-- jurusan dikirim tersembunyi supaya tetap ikut ter-submit lewat tombol chip di bawah --}}
                <input type="hidden" name="jurusan" value="{{ request('jurusan') }}">

                <button type="submit" class="rounded-lg px-4 py-2 text-sm font-medium transition hover:brightness-110" style="background:#0B1220;color:#fff">
                    Terapkan
                </button>

                @if (request()->hasAny(['q', 'tahun_lulus', 'jurusan']))
                    <a href="{{ route('alumni.index') }}#direktori" class="text-sm text-gray-500 underline">Reset</a>
                @endif
            </div>

            @if ($jurusanOptions->isNotEmpty())
                <div class="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
                    <span class="text-xs text-gray-400">Jurusan:</span>
                    <button
                        type="submit"
                        name="jurusan"
                        value=""
                        class="rounded-full border px-3 py-1 text-xs font-medium transition"
                        style="{{ request('jurusan') ? 'border-color:#E5E7EB;color:#6B7280' : 'border-color:#0B1220;background:#0B1220;color:#fff' }}"
                    >
                        Semua
                    </button>
                    @foreach ($jurusanOptions as $jurusan)
                        <button
                            type="submit"
                            name="jurusan"
                            value="{{ $jurusan }}"
                            class="rounded-full border px-3 py-1 text-xs font-medium transition"
                            style="{{ request('jurusan') === $jurusan ? 'border-color:#0B1220;background:#0B1220;color:#fff' : 'border-color:#E5E7EB;color:#6B7280' }}"
                        >
                            {{ $jurusan }}
                        </button>
                    @endforeach
                </div>
            @endif
        </form>

        @if ($alumni->isEmpty())
            <div class="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 py-16 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <p class="text-sm font-medium text-gray-500">Tidak ada alumni yang cocok</p>
                <p class="max-w-xs text-xs text-gray-400">Coba ubah kata kunci atau hapus salah satu filter yang aktif.</p>
                @if (request()->hasAny(['q', 'tahun_lulus', 'jurusan']))
                    <a href="{{ route('alumni.index') }}#direktori" class="mt-1 text-xs font-medium underline" style="color:#0B1220">
                        Reset pencarian
                    </a>
                @endif
            </div>
        @else
            <p class="mb-4 text-xs text-gray-400">
                Menampilkan {{ $alumni->firstItem() }}–{{ $alumni->lastItem() }} dari {{ $alumni->total() }} alumni
            </p>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                @foreach ($alumni as $item)
                    <div class="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm">
                        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-xs font-semibold" style="background:#0B1220;color:#D4AF37">
                            '{{ substr((string) $item->tahun_lulus, 2) }}
                        </span>
                        <div class="min-w-0 flex-1">
                            <div class="flex items-center justify-between gap-2">
                                <p class="truncate text-sm font-medium text-gray-900">{{ $item->nama_lengkap }}</p>
                                @if ($item->jurusan)
                                    <span class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium" style="background:#FFFBEB;color:#92610A">
                                        {{ $item->jurusan }}
                                    </span>
                                @endif
                            </div>
                            <p class="mt-0.5 text-xs text-gray-500">
                                Angkatan {{ $item->angkatan->tahun ?? $item->tahun_lulus }}
                            </p>

                            <div class="mt-2 space-y-1 border-t border-gray-100 pt-2">
                                <p class="flex items-center gap-1.5 truncate text-xs text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M20 7h-9m3-3l-3 3 3 3M4 17h9m-3 3l3-3-3-3M4 7h1m15 10h-1"/>
                                        <rect x="3" y="10" width="7" height="4" rx="1" stroke-width="2"/>
                                    </svg>
                                    {{ $item->pekerjaan ?: 'Pekerjaan belum diisi' }}
                                </p>
                                @if ($item->kota_domisili)
                                    <p class="flex items-center gap-1.5 truncate text-xs text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/>
                                            <circle cx="12" cy="11" r="3" stroke-width="2"/>
                                        </svg>
                                        {{ $item->kota_domisili }}
                                    </p>
                                @endif
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="mt-10 border-t border-gray-200 pt-6">
                {{ $alumni->links() }}
            </div>
        @endif
    </main>

    <footer class="border-t border-gray-200 py-10">
        <div class="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-semibold" style="background:#0B1220;color:#D4AF37">
                AM
            </div>
            <p class="text-sm text-gray-500">{{ config('app.name') }}</p>
            <p class="text-xs text-gray-400">&copy; {{ now()->year }} — direktori alumni resmi</p>
        </div>
    </footer>

</body>
</html>
