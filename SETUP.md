# Setup Instructions

Struktur project ini sudah disiapkan (skeleton Laravel resmi + migration & model
sesuai `docs/DATABASE.md`, plus folder Filament/Policies/Services sesuai
`docs/ARCHITECTURE.md`). Karena sandbox ini tidak punya akses ke Packagist
(`repo.packagist.org` diblokir jaringan), `composer install` tidak bisa
dijalankan di sini — jalankan langkah berikut di komputer kamu:

```bash
cd alumni-management

# 1. Install dependency PHP (termasuk Filament, sudah ada di composer.json)
composer install

# 2. Install Filament panel (generate AdminPanelProvider, dsb)
php artisan filament:install --panels

# 3. Siapkan environment
cp .env.example .env
php artisan key:generate

# 4. Buat database "alumni" di MySQL, lalu jalankan migration
php artisan migrate

# 5. Buat user admin pertama untuk login ke panel
php artisan make:filament-user

# 6. Install dependency frontend & build asset
npm install
npm run build

# 7. Jalankan server
php artisan serve
```

## Yang sudah disiapkan

- Migration: `users` (+ kolom `role`), `angkatan`, `alumni` — sesuai `docs/DATABASE.md`
- Model: `User`, `Angkatan`, `Alumni` dengan relasi:
  - `User hasOne Alumni`
  - `Angkatan hasMany Alumni`
- Folder kosong siap pakai: `app/Filament/{Resources,Pages,Widgets}`, `app/Policies`, `app/Services`
- `composer.json` sudah menambahkan `filament/filament`
- `.env.example` sudah diarahkan ke MySQL (`alumni` database) sesuai dokumen project

## Yang masih perlu dibuat (langkah berikutnya)

Sesuai `docs/ROADMAP.md` Phase 0–1:

- [ ] Filament Resource untuk `Alumni` dan `Angkatan`
- [ ] Policy `AlumniPolicy` (alumni hanya boleh edit profil sendiri — lihat `docs/SECURITY.md`)
- [ ] Form Request untuk validasi profil alumni
- [ ] Seeder data development
- [ ] Halaman registrasi/login alumni (di luar panel Filament)
