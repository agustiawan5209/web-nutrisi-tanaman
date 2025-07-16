<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Dataset;
use App\Models\JenisTanaman;
use App\Models\Kriteria;
use Illuminate\Http\Request;

class RandomForestController extends Controller
{
    private const BASE_BREADCRUMB = [
        [
            'title' => 'dashboard',
            'href' => '/dashboard',
        ],
        [
            'title' => 'random-forest',
            'href' => '/admin/random-forest/',
        ],
    ];
    public function train(array $data): void
    {
        // Logic to train the Random Forest model with the provided data
    }

    public function index(Request $request)
    {
        // Handle the request to display the Random Forest model index page
        // dd($this->getData());
        return Inertia::render('RandomForest/Index', [
            'dataTraining' => $this->getData(),
            'breadcrumb' => self::BASE_BREADCRUMB,
            'titlePage' => 'randomForest',
            'can' => [
                'add' => true,
                'edit' => true,
                'show' => true,
                'delete' => true,
            ]
        ]);
    }

    private function getData()
    {
        // Logic to retrieve data for the Random Forest model

        $data = [];
        $dataset = Dataset::with(['detail'])->orderBy('id', 'desc')->get();
        $kriteria = Kriteria::select('nama')->orderBy('id', 'asc')->get()->pluck('nama')->toArray();

        foreach ($dataset as $row) {
            $attribut = [];
            foreach ($row->detail as $key=> $detail) {
                $attribut[$key] = intval($detail->nilai);
            }
            $data[] = array_merge($attribut, [
                 JenisTanaman::where('nama', $row->jenis_tanaman)->first()->id,
                  $row->label,
            ]);
        }
        return [
            'training'=> array_values($data),
            'kriteria' => array_merge($kriteria, ["jenis_tanaman", 'label']),
        ];
    }
}
