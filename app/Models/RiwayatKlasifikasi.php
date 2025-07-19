<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatKlasifikasi extends Model
{
    /** @use HasFactory<\Database\Factories\RiwayatKlasifikasiFactory> */
    use HasFactory;

    protected $fillable = [
        "label",
        "jenis_tanaman",
        "attribut",
    ];

    protected $casts = [
        'attribut' => 'json',
    ];
}
