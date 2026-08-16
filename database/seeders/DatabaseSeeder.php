<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Akun admin untuk login ke /admin (email: admin@alumni.test, password: password)
        User::factory()->create([
            'name' => 'Admin Sekolah',
            'email' => 'admin@alumni.test',
            'role' => User::ROLE_SUPER_ADMIN,
        ]);

        $this->call([
            AngkatanSeeder::class,
            AlumniSeeder::class,
        ]);
    }
}
