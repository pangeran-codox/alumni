<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Direktori Alumni — {{ config('app.name') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-50 text-gray-900">

    {{-- Nav --}}
    <header class="sticky top-0 z-10 border-b border-white/10" style="background:#0B1220">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold" style="background:#D4AF37;color:#0B1220">
                    AM
                </div>
                <span class="font-serif text-sm font-semibold text-white">{{ config('app.name') }}</span>
            </div>
            <a href="#direktori" class="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 hover:text-white">
                Cari alumni
            </a>
        </div>
    </header>

    {{-- Hero --}}
    <section class="relative overflow-hidden" style="background:#0B1220">
        <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full" style="background:radial-gradient(circle,rgba(212,175,55,0.15),transparent 70%)"></div>

        <div class="relative mx-auto max-w-6xl px-6 py-20">
            <p class="text-xs font-medium uppercase tracking-[0.2em]" style="color:#D4AF37">Direktori resmi</p>
            <h1 class="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Menyambungkan kembali jejak setiap alumni
            </h1>
            <p class="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                Satu tempat untuk menelusuri alumni {{ config('app.name') }} — cari berdasarkan nama,
                angkatan, atau jurusan, dan lihat ke mana perjalanan mereka membawa mereka.
            </p>
            <a href="#direktori" class="mt-8 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium" style="background:#D4AF37;color:#0B1220">
                Jelajahi direktori
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </a>

            <div class="mt-16 grid grid-cols-1 gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
                <div>
                    <p class="font-serif text-3xl font-semibold text-white">{{ number_format($totalTerverifikasi) }}</p>
                    <p class="mt-1 text-sm text-white/50">Alumni terverifikasi</p>
                </div>
                <div>
                    <p class="font-serif text-3xl font-semibold text-white">{{ number_format($totalAngkatan) }}</p>
                    <p class="mt-1 text-sm text-white/50">Angkatan tercatat</p>
                </div>
                <div>
                    <p class="font-serif text-3xl font-semibold text-white">{{ number_format($totalKota) }}</p>
                    <p class="mt-1 text-sm text-white/50">Kota domisili</p>
                </div>
            </div>
        </div>
    </section>

    {{-- Direktori --}}
    <main id="direktori" class="mx-auto max-w-6xl px-6 py-16">
        <div class="mb-8 flex items-end justify-between">
            <div>
                <h2 class="font-serif text-2xl font-semibold text-gray-900">Cari alumni</h2>
                <p class="mt-1 text-sm text-gray-500">Gunakan nama, tahun lulus, atau jurusan untuk mempersempit pencarian.</p>
            </div>
        </div>

        <form method="GET" action="{{ route('alumni.index') }}#direktori" class="mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <div class="flex min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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

            <select name="jurusan" class="rounded-lg border border-gray-200 py-2 pl-3 pr-8 text-sm text-gray-700">
                <option value="">Semua jurusan</option>
                @foreach ($jurusanOptions as $jurusan)
                    <option value="{{ $jurusan }}" @selected(request('jurusan') === $jurusan)>{{ $jurusan }}</option>
                @endforeach
            </select>

            <button type="submit" class="rounded-lg px-4 py-2 text-sm font-medium" style="background:#0B1220;color:#fff">
                Terapkan
            </button>

            @if (request()->hasAny(['q', 'tahun_lulus', 'jurusan']))
                <a href="{{ route('alumni.index') }}#direktori" class="text-sm text-gray-500 underline">Reset</a>
            @endif
        </form>

        @if ($alumni->isEmpty())
            <div class="flex h-40 items-center justify-center rounded-xl border border-dashed border-gray-300 text-sm text-gray-400">
                Tidak ada alumni yang cocok dengan pencarian.
            </div>
        @else
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                @foreach ($alumni as $item)
                    <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-xs font-semibold" style="background:#0B1220;color:#D4AF37">
                            '{{ substr((string) $item->tahun_lulus, 2) }}
                        </span>
                        <div class="min-w-0">
                            <p class="truncate text-sm font-medium text-gray-900">{{ $item->nama_lengkap }}</p>
                            <p class="truncate text-xs text-gray-500">
                                {{ $item->jurusan ?? 'Jurusan tidak diisi' }}
                                @if ($item->angkatan) &middot; Angkatan {{ $item->angkatan->tahun }} @endif
                            </p>
                            <p class="mt-0.5 truncate text-xs text-gray-500">
                                {{ $item->pekerjaan ?: 'Pekerjaan belum diisi' }}
                                @if ($item->kota_domisili) &middot; {{ $item->kota_domisili }} @endif
                            </p>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="mt-10">
                {{ $alumni->links() }}
            </div>
        @endif
    </main>

    <footer class="border-t border-gray-200 py-8">
        <div class="mx-auto max-w-6xl px-6 text-sm text-gray-400">
            &copy; {{ now()->year }} {{ config('app.name') }}
        </div>
    </footer>

</body>
</html>
