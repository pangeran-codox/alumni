<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alumni', function (Blueprint $table) {
            $table->id();

            // Relasi
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->foreignId('angkatan_id')->nullable()->constrained('angkatan')->nullOnDelete();

            // Data pribadi
            $table->string('nama_lengkap');
            $table->string('nama_panggilan')->nullable();
            $table->string('email')->unique();
            $table->string('no_hp')->nullable();
            $table->text('alamat')->nullable();

            // Data akademik
            $table->unsignedSmallInteger('tahun_masuk')->nullable();
            $table->unsignedSmallInteger('tahun_lulus')->nullable();
            $table->string('jurusan')->nullable();

            // Data tambahan
            $table->string('foto')->nullable();
            $table->string('pendidikan_terakhir')->nullable();
            $table->string('pekerjaan')->nullable();
            $table->string('perusahaan')->nullable();
            $table->string('jabatan')->nullable();
            $table->string('kota_domisili')->nullable();

            // Verifikasi
            $table->string('status_verifikasi')->default('pending'); // pending | verified | rejected
            $table->timestamp('verified_at')->nullable();

            $table->timestamps();

            // Index sesuai DATABASE.md
            $table->index('tahun_lulus');
            $table->index('status_verifikasi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumni');
    }
};
