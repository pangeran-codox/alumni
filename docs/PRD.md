# Product Requirements Document — Alumni Management System

## 1. Ringkasan

Alumni Management System adalah aplikasi web untuk mengumpulkan, mengelola, memverifikasi, dan menyajikan data alumni sekolah secara terstruktur.

Sistem ditujukan untuk sekolah dan alumni.

## 2. Masalah

Data alumni sering tersebar di:

- spreadsheet;
- dokumen lama;
- grup komunikasi;
- arsip manual;
- database yang tidak konsisten.

Akibatnya sekolah kesulitan mengetahui:

- siapa saja alumni yang sudah terdata;
- tahun kelulusan;
- kontak terbaru;
- pendidikan lanjutan;
- pekerjaan;
- status data yang sudah diverifikasi.

## 3. Tujuan Produk

### Tujuan utama

Membuat satu sumber data alumni yang mudah dikelola dan diperbarui.

### Tujuan sekunder

- Mengurangi input data manual oleh admin.
- Meningkatkan kualitas dan konsistensi data.
- Memudahkan pencarian alumni.
- Menyediakan statistik alumni.
- Memudahkan export data.

## 4. Non-Goals

Versi awal tidak bertujuan menjadi:

- jejaring sosial alumni;
- aplikasi chat;
- marketplace pekerjaan;
- platform pembelajaran;
- mobile application native;
- microservice platform.

Fitur tersebut dapat dipertimbangkan pada fase berikutnya.

## 5. Aktor

### Alumni

Dapat:

- membuat akun;
- mengisi profil;
- memperbarui data;
- melihat status verifikasi;
- mengajukan perubahan data.

### Admin

Dapat:

- melihat data alumni;
- membuat/mengubah/menghapus data;
- memverifikasi data;
- melakukan pencarian dan filter;
- mengelola angkatan;
- melihat statistik;
- melakukan export.

### Super Admin

Dapat melakukan seluruh aktivitas admin serta mengelola user dan konfigurasi penting.

## 6. Data Alumni

Data minimal:

- nama lengkap;
- nama panggilan;
- jenis kelamin jika dibutuhkan;
- tanggal lahir jika dibutuhkan;
- email;
- nomor telepon;
- alamat;
- tahun masuk;
- tahun lulus;
- jurusan/kelas;
- foto profil;
- pendidikan terakhir;
- pekerjaan;
- perusahaan/instansi;
- jabatan;
- kota domisili;
- status verifikasi.

Data sensitif atau tidak diperlukan jangan dikumpulkan.

## 7. Functional Requirements

### FR-01 Authentication

Sistem harus menyediakan autentikasi untuk alumni dan administrator.

### FR-02 Registrasi Alumni

Alumni dapat membuat akun dan mengisi data awal.

### FR-03 Profil Alumni

Alumni dapat melihat dan memperbarui profilnya.

### FR-04 Verifikasi

Admin dapat memeriksa dan mengubah status verifikasi alumni.

Status awal yang disarankan:

- `pending`
- `verified`
- `rejected`

### FR-05 Alumni Management

Admin dapat melakukan CRUD data alumni.

### FR-06 Search

Admin dapat mencari alumni berdasarkan nama atau identifier yang relevan.

### FR-07 Filter

Admin dapat memfilter berdasarkan:

- tahun lulus;
- jurusan;
- status verifikasi;
- pekerjaan;
- lokasi, bila tersedia.

### FR-08 Dashboard

Dashboard menampilkan metrik seperti:

- total alumni;
- alumni terverifikasi;
- alumni pending;
- jumlah per angkatan;
- jumlah berdasarkan status pekerjaan bila datanya tersedia.

### FR-09 Export

Admin dapat melakukan export data sesuai hak akses.

### FR-10 Audit

Perubahan penting pada data dapat dilacak bila kebutuhan audit mengharuskannya.

## 8. Non-Functional Requirements

### Security

- Password disimpan menggunakan mekanisme hashing Laravel.
- Authorization harus diterapkan pada operasi admin.
- Validasi input dilakukan di server.
- Upload file harus divalidasi.
- Data pribadi tidak boleh ditampilkan secara publik tanpa alasan dan izin yang sesuai.

### Performance

Untuk versi awal, aplikasi harus tetap responsif pada beban penggunaan sekolah normal.

Optimasi dilakukan berdasarkan pengukuran, bukan asumsi.

### Maintainability

- Gunakan struktur Laravel standar.
- Business logic jangan ditumpuk seluruhnya di controller.
- Gunakan Form Request/validation untuk input yang kompleks.
- Gunakan Policies untuk authorization.
- Migration menjadi sumber struktur database.

## 9. MVP

MVP wajib memiliki:

- authentication;
- user/alumni;
- profil alumni;
- CRUD alumni;
- tahun/angkatan;
- verifikasi;
- pencarian;
- filter;
- dashboard sederhana;
- export.

## 10. Success Criteria

MVP dianggap berhasil jika:

1. Admin dapat mengelola data alumni tanpa spreadsheet sebagai sistem utama.
2. Alumni dapat memperbarui data sendiri.
3. Admin dapat memverifikasi data.
4. Data dapat dicari dan difilter.
5. Data dapat diekspor.
6. Hak akses mencegah alumni mengubah data milik alumni lain.
