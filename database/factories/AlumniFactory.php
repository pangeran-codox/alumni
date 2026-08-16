<?php

namespace Database\Factories;

use App\Models\Alumni;
use App\Models\Angkatan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Alumni>
 */
class AlumniFactory extends Factory
{
    protected $model = Alumni::class;

    public function definition(): array
    {
        $jurusan = fake()->randomElement(['IPA', 'IPS', 'RPL', 'Bahasa']);
        $tahunLulus = fake()->numberBetween(2015, now()->year);

        return [
            'user_id' => User::factory(),
            'angkatan_id' => Angkatan::query()->inRandomOrder()->value('id')
                ?? Angkatan::factory(),
            'nama_lengkap' => fake()->name(),
            'nama_panggilan' => fake()->firstName(),
            'email' => fake()->unique()->safeEmail(),
            'no_hp' => fake()->numerify('08##########'),
            'alamat' => fake()->address(),
            'tahun_masuk' => $tahunLulus - 3,
            'tahun_lulus' => $tahunLulus,
            'jurusan' => $jurusan,
            'foto' => null,
            'pendidikan_terakhir' => fake()->randomElement(['SMA/SMK', 'D3', 'S1', 'S2']),
            'pekerjaan' => fake()->jobTitle(),
            'perusahaan' => fake()->company(),
            'jabatan' => fake()->jobTitle(),
            'kota_domisili' => fake()->city(),
            'status_verifikasi' => fake()->randomElement([
                Alumni::STATUS_VERIFIED,
                Alumni::STATUS_VERIFIED,
                Alumni::STATUS_VERIFIED,
                Alumni::STATUS_PENDING,
                Alumni::STATUS_REJECTED,
            ]),
            'verified_at' => fn (array $attributes) => $attributes['status_verifikasi'] === Alumni::STATUS_VERIFIED
                ? now()
                : null,
        ];
    }

    public function verified(): static
    {
        return $this->state(fn () => [
            'status_verifikasi' => Alumni::STATUS_VERIFIED,
            'verified_at' => now(),
        ]);
    }

    public function pending(): static
    {
        return $this->state(fn () => [
            'status_verifikasi' => Alumni::STATUS_PENDING,
            'verified_at' => null,
        ]);
    }
}
