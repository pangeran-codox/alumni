# Database Design

## 1. Entitas Utama

### users

Menyimpan akun untuk authentication.

Kolom penting:

- id
- name
- email
- password
- role
- timestamps

### alumni

Menyimpan profil alumni.

Kolom awal:

- id
- user_id
- nama_lengkap
- nama_panggilan
- email
- no_hp
- alamat
- tahun_masuk
- tahun_lulus
- jurusan
- foto
- pendidikan_terakhir
- pekerjaan
- perusahaan
- jabatan
- kota_domisili
- status_verifikasi
- verified_at
- timestamps

### angkatan

Jika sekolah membutuhkan pengelolaan angkatan secara eksplisit.

Kolom:

- id
- tahun
- nama
- timestamps

Relasi:

```text
User 1 --- 0..1 Alumni
Angkatan 1 --- N Alumni
```

## 2. Catatan Desain

Jangan membuat terlalu banyak kolom sebelum requirement jelas.

Contoh:

Jika sekolah hanya membutuhkan `tahun_lulus`, tidak perlu membuat entitas kompleks untuk angkatan.

Sebaliknya, jika angkatan memiliki metadata, wali kelas, jurusan, atau informasi lain, entitas `angkatan` menjadi lebih masuk akal.

## 3. Index

Index dipertimbangkan untuk kolom yang sering digunakan dalam:

- search;
- filter;
- sorting;
- foreign key;
- unique constraint.

Contoh:

- email unique;
- tahun_lulus index;
- status_verifikasi index;
- user_id unique/foreign key.

## 4. Data Integrity

Gunakan:

- foreign key;
- unique constraint;
- nullable hanya jika memang valid;
- enum/string status yang konsisten;
- database transaction untuk operasi multi-step.

## 5. Privacy

Data pribadi yang tidak diperlukan jangan disimpan.

Field yang ditampilkan publik harus dipisahkan secara konseptual dari field internal/admin.
