<?php

namespace App\Http\Controllers\Guest;

use Inertia\Inertia;
use App\Models\Label;
use App\Models\Gejala;
use App\Models\Dataset;
use App\Models\Kriteria;
use App\Models\JenisTanaman;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class KlasifikasiController extends Controller
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

    public function index(Request $request)
    {
        // Handle the request to display the Random Forest model index page
        // dd($this->getData());
        return Inertia::render('guest/klasifikasi', [
            'dataTraining' => $this->getData(),
            "kriteria" => Kriteria::all(),
            "jenisTanaman" => JenisTanaman::all(),
            "opsiLabel" => Label::all(),
            "opsiGejala"=> Gejala::orderBy('id', 'desc')->get(),
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
        $dataset = Dataset::with(['detail', 'detail.kriteria'])->orderBy('id', 'desc')->get();
        $kriteria = Kriteria::select('nama')->orderBy('id', 'asc')->get()->pluck('nama')->toArray();
        foreach ($dataset as $row) {
            $attribut = [];
            foreach ($row->detail as $key => $detail) {
                if ($key === 3 || $detail->kriteria_id == 4 || $detail->kriteria->nama === "gejala") {
                  $gejala = Gejala::where('nama', 'like', '%' . $detail->nilai . '%')->first();
                   if($gejala){
                     $attribut[$key] = $gejala->id;
                   }else{
                     $attribut[$key] = 0;
                   }
                } else {
                    $attribut[$key] = intval($detail->nilai);
                }
            }
            $data[] = array_merge($attribut, [
                JenisTanaman::where('nama', $row->jenis_tanaman)->first()->id,
                $row->label,
            ]);
        }
        // dd($data);
        return [
            'training' => array_values($data),
            'kriteria' => array_merge($kriteria, ["jenis_tanaman", 'label']),
        ];
    }
}
