# Architecture

## 1. Pendekatan

Aplikasi menggunakan **modular monolith Laravel**.

Semua komponen berada dalam satu aplikasi dan satu deployment.

```text
Browser
   |
   v
Laravel
   |
   +-- Public Web
   +-- Alumni Area
   +-- Filament Admin Panel
   |
   v
Database
```

## 2. Framework

Laravel menjadi framework utama.

Filament digunakan khususnya untuk admin panel dan resource management.

Blade digunakan untuk halaman yang membutuhkan UI custom di luar panel Filament.

## 3. Mengapa Modular Monolith?

Project ini tidak membutuhkan microservices pada tahap awal.

Keuntungan:

- deployment sederhana;
- debugging sederhana;
- transaksi database mudah;
- authentication terpusat;
- authorization terpusat;
- biaya operasional rendah;
- lebih sedikit titik kegagalan.

## 4. Struktur Logis

```text
app/
├── Filament/
│   ├── Resources/
│   ├── Pages/
│   └── Widgets/
├── Http/
│   ├── Controllers/
│   ├── Requests/
│   └── Middleware/
├── Models/
├── Policies/
└── Services/
```

`Services/` tidak wajib untuk setiap CRUD. Gunakan hanya ketika sebuah business process memang cukup kompleks untuk dipisahkan.

## 5. Database

Database relational digunakan sebagai source of truth.

PostgreSQL direkomendasikan bila project memang sudah memakai PostgreSQL. MySQL juga valid.

## 6. Tidak Ada Infrastruktur Tambahan Pada MVP

Jangan menambahkan:

- Redis;
- queue worker;
- message broker;
- microservices;
- API gateway;
- gRPC;
- dedicated cache server.

kecuali requirement baru benar-benar membutuhkan salah satunya.

## 7. Filament

Filament bertanggung jawab terutama terhadap:

- admin resources;
- tables;
- forms;
- filters;
- actions;
- dashboard widgets;
- admin authentication.

Public-facing UI tidak harus menggunakan Filament.

## 8. Business Logic

Controller atau Filament Resource tidak boleh menjadi tempat menumpuk business logic kompleks.

Untuk proses seperti:

- verifikasi alumni;
- import massal;
- perubahan status;
- workflow approval;

gunakan service/action class bila kompleksitasnya sudah membenarkan pemisahan.

## 9. Scaling

Jika aplikasi berkembang:

1. ukur bottleneck;
2. optimalkan query/index;
3. optimalkan pagination;
4. tambahkan caching bila terbukti diperlukan;
5. baru pertimbangkan queue atau infrastructure tambahan.

Scaling mengikuti kebutuhan nyata.
