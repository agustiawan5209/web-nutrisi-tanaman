<?php

namespace Database\Seeders;

use App\Models\Dataset;
use App\Models\DetailDataset;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatasetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $id_dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        $jenis_tanaman = ["Kangkung", "Selada", "Seledri", "Bayam", "Pakcoy"];
        $label = ["Buruk", "Cukup", "Baik", "Sangat Baik"];
        // Loop through each dataset ID and create a new Dataset entry

        foreach ($id_dataset as $dataset_id) {
            $attribut =  [
                ["kriteria_id" => 1, "nilai" => fake()->numberBetween(20,30)],
                ["kriteria_id" => 2, "nilai" => fake()->numberBetween(600,900)],
                ["kriteria_id" => 3, "nilai" => fake()->numberBetween(20,50)],
                ["kriteria_id" => 4, "nilai" => fake()->numberBetween(100,200)],
                ["kriteria_id" => 5, "nilai" => fake()->numberBetween(30,50)],
                ["kriteria_id" => 6, "nilai" => fake()->numberBetween(11,30)],
            ];
            $data = Dataset::create(
                [
                    'data' => json_encode($attribut),
                    'jenis_tanaman' => fake()->randomElement($jenis_tanaman),
                    'label' => fake()->randomElement($label),
                ]
            );

            foreach ($attribut as $key => $value) {
                DetailDataset::create(
                    [
                        'dataset_id' => $data->id,
                        'kriteria_id' => $value['kriteria_id'],
                        'nilai' => $value['nilai'],
                    ]
                );
            }
        }
    }
}
