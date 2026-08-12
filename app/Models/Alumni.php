<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'angkatan_id',
    'nama_lengkap',
    'nama_panggilan',
    'email',
    'no_hp',
    'alamat',
    'tahun_masuk',
    'tahun_lulus',
    'jurusan',
    'foto',
    'pendidikan_terakhir',
    'pekerjaan',
    'perusahaan',
    'jabatan',
    'kota_domisili',
    'status_verifikasi',
    'verified_at',
])]
class Alumni extends Model
{
    use HasFactory;

    protected $table = 'alumni';

    public const STATUS_PENDING = 'pending';

    public const STATUS_VERIFIED = 'verified';

    public const STATUS_REJECTED = 'rejected';

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'verified_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo<Angkatan, $this>
     */
    public function angkatan(): BelongsTo
    {
        return $this->belongsTo(Angkatan::class);
    }

    public function isVerified(): bool
    {
        return $this->status_verifikasi === self::STATUS_VERIFIED;
    }
}
