# Contributing

## Prinsip

Project harus tetap sederhana dan mudah dipahami.

### Sebelum menambahkan dependency

Tanyakan:

1. Apakah requirement benar-benar membutuhkannya?
2. Apakah Laravel sudah menyediakan fitur tersebut?
3. Apakah dependency menambah maintenance?
4. Apakah ada solusi yang lebih sederhana?

### Coding

- Ikuti struktur Laravel.
- Gunakan naming yang jelas.
- Hindari abstraction tanpa kebutuhan.
- Hindari service class untuk CRUD sederhana.
- Validasi input.
- Terapkan authorization.
- Buat migration untuk perubahan schema.

### Database

Jangan mengubah database production secara manual jika perubahan dapat direpresentasikan melalui migration.

### Pull Request

Setiap perubahan besar sebaiknya menjelaskan:

- masalah;
- solusi;
- dampak;
- perubahan database;
- perubahan permission;
- cara testing.

## Filosofi

> Simple until complexity is justified.
