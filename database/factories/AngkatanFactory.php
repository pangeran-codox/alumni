<?php

namespace Database\Factories;

use App\Models\Angkatan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Angkatan>
 */
class AngkatanFactory extends Factory
{
    protected $model = Angkatan::class;

    public function definition(): array
    {
        return [
            'tahun' => fake()->unique()->numberBetween(2015, now()->year),
            'nama' => null,
        ];
    }
}
