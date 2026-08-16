<?php

namespace Database\Seeders;

use App\Models\Angkatan;
use Illuminate\Database\Seeder;

class AngkatanSeeder extends Seeder
{
    public function run(): void
    {
        $tahunSekarang = now()->year;

        foreach (range($tahunSekarang - 4, $tahunSekarang) as $tahun) {
            Angkatan::firstOrCreate(['tahun' => $tahun]);
        }
    }
}
