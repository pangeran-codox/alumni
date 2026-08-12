# Security Guidelines

## Authentication

Gunakan authentication Laravel dan mekanisme password hashing bawaan.

## Authorization

Jangan hanya menyembunyikan tombol UI.

Setiap operasi penting harus memiliki authorization di server.

Contoh:

- Alumni hanya boleh mengubah profil sendiri.
- Admin boleh mengelola alumni sesuai role.
- Super Admin memiliki akses administrasi penuh.

Gunakan Policies/Gates Laravel dan authorization Filament.

## Validation

Semua input user harus divalidasi.

Validasi berlaku untuk:

- form alumni;
- upload foto;
- import data;
- query/filter yang menerima input;
- perubahan profile.

## File Upload

Upload harus memiliki:

- validasi MIME/type;
- batas ukuran;
- nama file yang aman;
- storage yang sesuai.

Jangan mempercayai extension file saja.

## Privacy

Data alumni adalah data pribadi.

Prinsip:

- collect only what is necessary;
- tampilkan data publik seminimal mungkin;
- jangan expose email/nomor telepon tanpa kebutuhan;
- batasi export berdasarkan role;
- gunakan HTTPS pada deployment production.

## Audit

Untuk perubahan administratif yang penting, pertimbangkan audit trail.

Audit tidak harus dibuat kompleks pada MVP.

## Backup

Database production harus memiliki backup terjadwal dan prosedur restore yang pernah diuji.

Backup yang belum pernah diuji restore bukan backup yang bisa dipercaya.
