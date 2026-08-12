# 🎓 Alumni Management System

> Sistem pendataan alumni sekolah berbasis Laravel dan Filament yang dirancang untuk mengelola data alumni secara terstruktur, sederhana, dan mudah dikembangkan.

[![Laravel](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com/)
[![PHP](https://img.shields.io/badge/PHP-8.3%2B-777BB4?style=flat-square&logo=php&logoColor=white)](https://www.php.net/)
[![Filament](https://img.shields.io/badge/Filament-4.x-FDAE4B?style=flat-square)](https://filamentphp.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

## 📌 About

**Alumni Management System** adalah aplikasi web untuk membantu sekolah mengelola dan mendata alumni dalam satu sistem terpusat.

Project ini dibuat dengan pendekatan **modular monolith** menggunakan Laravel. Admin panel dibangun menggunakan Filament, sementara halaman publik menggunakan Blade.

Fokus utama project:

- Pengelolaan data alumni
- Pengelolaan angkatan
- Penyajian data alumni
- Struktur aplikasi yang sederhana dan mudah dipelihara
- Fondasi yang dapat dikembangkan sesuai kebutuhan sekolah

> Project ini sengaja tidak menggunakan microservices atau infrastructure tambahan pada tahap awal. Kompleksitas hanya akan ditambahkan jika kebutuhan produk memang membutuhkannya.

---

## ✨ Current Features

### 👨‍🎓 Alumni

- Pengelolaan data alumni
- Resource CRUD alumni melalui Filament
- Halaman daftar alumni
- Model dan relasi alumni
- Struktur data yang siap dikembangkan untuk proses verifikasi

### 🏫 Angkatan

- Pengelolaan data angkatan
- Resource CRUD angkatan melalui Filament
- Relasi angkatan dengan data alumni

### 🛠️ Admin Panel

Menggunakan **Filament** sebagai fondasi administration panel.

Admin panel menyediakan struktur untuk:

- Alumni Resource
- Angkatan Resource
- Form management
- Table management
- Filtering
- Dashboard/Widgets

### 🌐 Public Website

Halaman publik menggunakan Laravel Blade dan controller khusus:

```text
PublicAlumniController
```

Halaman publik saat ini memiliki fondasi untuk menampilkan data alumni tanpa mencampurkan kebutuhan public-facing UI dengan admin panel.

---

## 🧱 Tech Stack

| Technology | Purpose |
|---|---|
| **Laravel** | Web application framework |
| **PHP** | Backend programming language |
| **Filament** | Admin panel & resource management |
| **Blade** | Server-side rendered public UI |
| **Eloquent ORM** | Database interaction |
| **Vite** | Frontend asset development |
| **Tailwind CSS** | UI styling |
| **PostgreSQL / MySQL** | Relational database |

### Infrastructure Philosophy

Versi awal project sengaja dibuat sederhana.

Tidak ada kebutuhan awal untuk:

- ❌ Redis
- ❌ Queue worker
- ❌ Microservices
- ❌ Go service
- ❌ Rust service
- ❌ gRPC
- ❌ API gateway

Satu aplikasi Laravel sudah cukup untuk kebutuhan sistem saat ini.

---

## 🏗️ Architecture

Project menggunakan pendekatan **modular monolith**.

```text
                         ┌──────────────────────┐
                         │       Browser        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       Laravel        │
                         │                      │
                         │  ┌────────────────┐  │
                         │  │ Public Website │  │
                         │  └────────────────┘  │
                         │                      │
                         │  ┌────────────────┐  │
                         │  │ Filament Admin │  │
                         │  └────────────────┘  │
                         │                      │
                         │  ┌────────────────┐  │
                         │  │ Eloquent ORM   │  │
                         │  └────────────────┘  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Database        │
                         └──────────────────────┘
```

### Why Modular Monolith?

Karena sistem pendataan alumni tidak membutuhkan distribusi service sejak awal.

Keuntungannya:

- Deployment lebih sederhana
- Debugging lebih mudah
- Development lebih cepat
- Database transaction lebih mudah dikelola
- Maintenance lebih ringan
- Infrastruktur lebih murah
- Lebih sedikit failure points

---

## 📂 Project Structure

Struktur utama project:

```text
app/
├── Filament/
│   ├── Pages/
│   ├── Resources/
│   │   ├── AlumniResource.php
│   │   ├── AlumniResource/
│   │   │   └── Pages/
│   │   ├── AngkatanResource.php
│   │   └── AngkatanResource/
│   │       └── Pages/
│   └── Widgets/
│
├── Http/
│   └── Controllers/
│       ├── Controller.php
│       └── PublicAlumniController.php
│
├── Models/
│   ├── Alumni.php
│   ├── Angkatan.php
│   └── User.php
│
├── Policies/
├── Providers/
│   ├── AppServiceProvider.php
│   └── Filament/
│       └── AdminPanelProvider.php
│
└── Services/

database/
├── factories/
├── migrations/
└── seeders/

resources/
├── css/
├── js/
└── views/
    ├── alumni/
    └── welcome.blade.php

routes/
└── web.php

docs/
├── ARCHITECTURE.md
├── CONTRIBUTING.md
├── DATABASE.md
├── PRD.md
├── PROJECT_SCOPE.md
├── ROADMAP.md
└── SECURITY.md
```

---

## 🗃️ Core Domain

Saat ini domain utama terdiri dari:

```text
User
 │
 └── Alumni

Angkatan
 │
 └── Alumni
```

### Alumni

Merepresentasikan data individu alumni.

Contoh informasi:

- Nama
- Kontak
- Tahun masuk
- Tahun lulus
- Angkatan
- Pendidikan
- Pekerjaan
- Domisili
- Informasi lain yang dibutuhkan sekolah

### Angkatan

Merepresentasikan kelompok alumni berdasarkan tahun atau kategori kelulusan.

---

## 🚀 Getting Started

### Requirements

Pastikan environment memiliki:

- PHP
- Composer
- Node.js & npm
- Database server
- Git

### 1. Clone Repository

```bash
git clone https://github.com/pangeran-codex/alumni.git
cd alumni
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Environment

Copy file environment:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Kemudian konfigurasi database pada `.env`.

### 5. Generate Application Key

```bash
php artisan key:generate
```

### 6. Run Migration

```bash
php artisan migrate
```

### 7. Build Frontend Assets

Untuk development:

```bash
npm run dev
```

Untuk production:

```bash
npm run build
```

### 8. Run Laravel

```bash
php artisan serve
```

Aplikasi dapat diakses melalui:

```text
http://127.0.0.1:8000
```

---

## 🧪 Testing

Test suite menggunakan PHPUnit melalui Laravel.

Jalankan:

```bash
php artisan test
```

Atau:

```bash
./vendor/bin/phpunit
```

Testing akan dikembangkan seiring bertambahnya fitur dan business rules.

---

## 🛣️ Roadmap

### Phase 1 — Foundation

- [x] Laravel project
- [x] Filament admin panel
- [x] Alumni model
- [x] Angkatan model
- [x] Alumni Resource
- [x] Angkatan Resource
- [x] Database migrations
- [x] Public alumni controller
- [x] Project documentation

### Phase 2 — Alumni Management

- [ ] Penyempurnaan profil alumni
- [ ] Authentication alumni
- [ ] Alumni dapat memperbarui profil
- [ ] Validasi data
- [ ] Authorization
- [ ] Status verifikasi

### Phase 3 — Management & Reporting

- [ ] Search alumni
- [ ] Filter alumni
- [ ] Dashboard statistics
- [ ] Export data
- [ ] Import data
- [ ] Audit trail

### Phase 4 — Public Experience

- [ ] Public alumni directory
- [ ] Alumni profile
- [ ] Privacy controls
- [ ] Penyempurnaan UI/UX

### Future

Fitur berikut tidak menjadi bagian dari MVP:

- Alumni networking
- Event alumni
- Job board
- Messaging
- Mobile application
- Public API
- Integrasi dengan sistem eksternal

---

## 🔐 Security

Security menjadi bagian dari desain sejak awal.

Prinsip utama:

- Password menggunakan hashing Laravel
- Validasi dilakukan di server
- Authorization diterapkan pada operasi yang membutuhkan permission
- Upload file harus divalidasi
- Data pribadi tidak ditampilkan secara publik tanpa kebutuhan
- Export data dibatasi berdasarkan hak akses
- Production menggunakan HTTPS

Dokumentasi security:

[`docs/SECURITY.md`](docs/SECURITY.md)

---

## 📚 Documentation

Dokumentasi project tersedia di folder [`docs`](docs/).

| Document | Description |
|---|---|
| [`PRD.md`](docs/PRD.md) | Product requirements |
| [`ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Application architecture |
| [`DATABASE.md`](docs/DATABASE.md) | Database design |
| [`SECURITY.md`](docs/SECURITY.md) | Security guidelines |
| [`ROADMAP.md`](docs/ROADMAP.md) | Development roadmap |
| [`PROJECT_SCOPE.md`](docs/PROJECT_SCOPE.md) | Project boundaries |
| [`CONTRIBUTING.md`](docs/CONTRIBUTING.md) | Contribution guidelines |

---

## 🧭 Development Philosophy

Project ini mengikuti prinsip:

> **Simple until complexity is justified.**

Artinya:

- Jangan membuat abstraction sebelum diperlukan.
- Jangan menambahkan service hanya karena "arsitektur yang bagus".
- Jangan menggunakan infrastructure yang belum dibutuhkan.
- Jangan melakukan premature optimization.
- Utamakan code yang mudah dibaca dan dipelihara.
- Tambahkan kompleksitas berdasarkan requirement dan hasil pengukuran.

Tujuannya bukan membuat sistem yang paling rumit.

Tujuannya membuat sistem yang **cukup kuat untuk kebutuhannya dan tetap mudah dikembangkan**.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using Laravel & Filament
</p>