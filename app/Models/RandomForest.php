<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class RandomForest extends Model
{
    protected $table = "random_forests"; // Define the table name if different from the default
    protected $fillable = [
        'name', // Assuming this is where the model data is stored
        'indikator', // Assuming this is where the model data is stored
        'model_json', // Assuming this is where the model data is stored
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'indikator'=> 'array',
        'model_json'=> 'array',
    ];
}
