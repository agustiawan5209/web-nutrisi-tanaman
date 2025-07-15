<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kriterias = array(
            array(
                "id" => 3,
                "nama" => "pH air",
                "deskripsi" => "pH",
                "created_at" => "2025-07-15 17:44:30",
                "updated_at" => "2025-07-15 17:44:30",
            ),
            array(
                "id" => 4,
                "nama" => "Part Per Million (PPM)",
                "deskripsi" => "Part Per Million (PPM)",
                "created_at" => "2025-07-15 17:44:41",
                "updated_at" => "2025-07-15 17:44:41",
            ),
            array(
                "id" => 5,
                "nama" => "ketinggian air",
                "deskripsi" => "ketinggian air",
                "created_at" => "2025-07-15 17:44:49",
                "updated_at" => "2025-07-15 17:44:49",
            ),
            array(
                "id" => 6,
                "nama" => "gejala",
                "deskripsi" => "gejala",
                "created_at" => "2025-07-15 17:44:54",
                "updated_at" => "2025-07-15 17:44:54",
            ),
            array(
                "id" => 7,
                "nama" => "umur panen",
                "deskripsi" => "umur panen",
                "created_at" => "2025-07-15 17:45:03",
                "updated_at" => "2025-07-15 17:45:03",
            ),
            array(
                "id" => 8,
                "nama" => "luas lahan",
                "deskripsi" => "luas lahan",
                "created_at" => "2025-07-15 17:45:14",
                "updated_at" => "2025-07-15 17:45:14",
            ),
        );

        Kriteria::insert($kriterias);
    }
}
