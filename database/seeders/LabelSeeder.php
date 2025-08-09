<?php

namespace Database\Seeders;

use App\Models\Label;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LabelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $labels = array(
            array(
                "id" => 1,
                "nama" => "Buruk",
                "deskripsi" => "Tanaman menunjukkan gejala kekurangan nutrisi yang serius. Segera evaluasi kembali kadar pH, PPM, dan kondisi air. Disarankan mengganti larutan nutrisi dan memperbaiki sistem sirkulasi.",
                "created_at" => "2025-07-17 10:21:01",
                "updated_at" => "2025-07-17 10:21:01",
            ),
            array(
                "id" => 2,
                "nama" => "Cukup",
                "deskripsi" => "Tanaman dalam kondisi sedang. Beberapa gejala defisiensi nutrisi mulai terlihat. Lakukan penyesuaian kecil pada komposisi nutrisi dan pantau perkembangan dalam 2–3 hari.",
                "created_at" => "2025-07-17 10:21:13",
                "updated_at" => "2025-07-17 10:21:13",
            ),
            array(
                "id" => 3,
                "nama" => "Baik",
                "deskripsi" => "Tanaman tumbuh dengan baik. Tidak ditemukan gejala yang mengkhawatirkan. Lanjutkan perawatan seperti biasa dengan jadwal pemberian nutrisi yang konsisten.",
                "created_at" => "2025-07-17 10:21:27",
                "updated_at" => "2025-07-17 10:21:27",
            ),
        );

        Label::insert($labels);
    }
}
