<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\Angkatan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AlumniApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Alumni::query()
            ->where('status_verifikasi', Alumni::STATUS_VERIFIED)
            ->select([
                'id',
                'nama_lengkap',
                'angkatan_id',
                'tahun_lulus',
                'jurusan',
                'kota_domisili',
                'pekerjaan',
            ])
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

        $perPage = min(max((int) $request->input('per_page', 12), 1), 50);

        $alumni = $query
            ->orderByDesc('tahun_lulus')
            ->orderBy('nama_lengkap')
            ->paginate($perPage)
            ->withQueryString();

        return response()->json([
            'data' => $alumni->items(),
            'meta' => [
                'current_page' => $alumni->currentPage(),
                'from' => $alumni->firstItem(),
                'last_page' => $alumni->lastPage(),
                'per_page' => $alumni->perPage(),
                'to' => $alumni->lastItem(),
                'total' => $alumni->total(),
            ],
        ]);
    }

    public function stats(): JsonResponse
    {
        return response()->json([
            'total' => Alumni::where('status_verifikasi', Alumni::STATUS_VERIFIED)->count(),
            'angkatan' => Angkatan::count(),
            'kota' => Alumni::where('status_verifikasi', Alumni::STATUS_VERIFIED)
                ->whereNotNull('kota_domisili')
                ->distinct('kota_domisili')
                ->count('kota_domisili'),
        ]);
    }

    public function filters(): JsonResponse
    {
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

        return response()->json([
            'tahunLulus' => $tahunLulusOptions,
            'jurusan' => $jurusanOptions,
        ]);
    }
}
