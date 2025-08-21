<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatKlasifikasi extends Model
{
    /** @use HasFactory<\Database\Factories\RiwayatKlasifikasiFactory> */
    use HasFactory;

    protected $fillable = [
        "user_id",
        "user",
        "label",
        "jenis_tanaman",
        "attribut",
        "kriteria",
    ];

    protected $casts = [
        'attribut' => 'json',
        'kriteria' => 'json',
        'user' => 'json',
    ];
}
