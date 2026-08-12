# Alumni Management System

Sistem pendataan alumni sekolah berbasis Laravel dan Filament.

## Tujuan

Menyediakan satu sistem sederhana untuk:

- Mendata alumni sekolah.
- Memungkinkan alumni memperbarui profil.
- Membantu admin mengelola dan memverifikasi data.
- Menyediakan pencarian, filter, statistik, dan export data.
- Menjadi sumber data alumni yang terstruktur dan mudah dipelihara.

## Stack

- Laravel
- PHP
- Filament
- Blade
- PostgreSQL atau MySQL
- Vite
- Tailwind CSS melalui ekosistem Laravel/Filament

Tidak ada kebutuhan awal untuk Redis, queue, microservices, Go, Rust, gRPC, atau service terpisah.

## Prinsip

Project ini sengaja dibuat sebagai **modular monolith** sederhana.

Prioritas:

1. Correctness
2. Security
3. Maintainability
4. Simplicity
5. Performance secukupnya

Jangan menambahkan infrastruktur hanya karena tersedia. Tambahkan komponen ketika requirement memang membutuhkannya.

## Area Aplikasi

### Public

- Landing page
- Informasi alumni
- Pencarian alumni bila memang diperlukan
- Detail alumni yang memang diizinkan tampil publik

### Alumni

- Registrasi/login
- Profil pribadi
- Pengisian dan pembaruan data
- Status verifikasi

### Admin

Admin panel menggunakan Filament.

- Dashboard
- Alumni
- Angkatan
- Sekolah/jurusan bila diperlukan
- User
- Verifikasi data
- Statistik
- Export

## Dokumentasi

- `docs/PRD.md` — product requirements
- `docs/ARCHITECTURE.md` — arsitektur aplikasi
- `docs/DATABASE.md` — rancangan database
- `docs/SECURITY.md` — prinsip keamanan
- `docs/ROADMAP.md` — tahapan pengembangan
- `docs/CONTRIBUTING.md` — aturan kontribusi
- `.env.example` — contoh konfigurasi environment

## Status

Project masih dalam tahap perancangan awal.
