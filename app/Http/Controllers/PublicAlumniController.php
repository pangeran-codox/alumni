<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use App\Models\Angkatan;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PublicAlumniController extends Controller
{
    /**
     * Tampilkan daftar alumni yang sudah terverifikasi untuk publik.
     *
     * Hanya field yang aman ditampilkan ke publik (nama, angkatan, jurusan,
     * kota domisili, pekerjaan) — email dan no_hp tidak pernah di-load di sini.
     * Lihat docs/SECURITY.md bagian Privacy.
     */
    public function index(Request $request): View
    {
        $query = Alumni::query()
            ->where('status_verifikasi', Alumni::STATUS_VERIFIED)
            ->select(['id', 'nama_lengkap', 'angkatan_id', 'tahun_lulus', 'jurusan', 'kota_domisili', 'pekerjaan'])
            ->with('angkatan:id,tahun,nama');

        if ($search = $request->string('q')->trim()->toString()) {
            $query->where('nama_lengkap', 'like', "%{$search}%");
        }

        if ($tahunLulus = $request->integer('tahun_lulus')) {
            $query->where('tahun_lulus', $tahunLulus);
        }

        if ($jurusan = $request->string('jurusan')->trim()->toString()) {
            $query->where('jurusan', $jurusan);
        }

        $alumni = $query
            ->orderByDesc('tahun_lulus')
            ->orderBy('nama_lengkap')
            ->paginate(12)
            ->withQueryString();

        $tahunLulusOptions = Alumni::query()
            ->where('status_verifikasi', Alumni::STATUS_VERIFIED)
            ->whereNotNull('tahun_lulus')
            ->distinct()
            ->orderByDesc('tahun_lulus')
            ->pluck('tahun_lulus');

        $jurusanOptions = Alumni::query()
            ->where('status_verifikasi', Alumni::STATUS_VERIFIED)
            ->whereNotNull('jurusan')
            ->distinct()
            ->orderBy('jurusan')
            ->pluck('jurusan');

        $angkatanBreakdown = Angkatan::query()
            ->withCount(['alumni' => fn ($q) => $q->where('status_verifikasi', Alumni::STATUS_VERIFIED)])
            ->orderByDesc('tahun')
            ->limit(6)
            ->get()
            ->sortBy('tahun')
            ->values();

        return view('alumni.index', [
            'alumni' => $alumni,
            'tahunLulusOptions' => $tahunLulusOptions,
            'jurusanOptions' => $jurusanOptions,
            'angkatanBreakdown' => $angkatanBreakdown,
            'totalTerverifikasi' => Alumni::where('status_verifikasi', Alumni::STATUS_VERIFIED)->count(),
            'totalAngkatan' => Angkatan::count(),
            'totalKota' => Alumni::where('status_verifikasi', Alumni::STATUS_VERIFIED)
                ->whereNotNull('kota_domisili')
                ->distinct('kota_domisili')
                ->count('kota_domisili'),
        ]);
    }
}
