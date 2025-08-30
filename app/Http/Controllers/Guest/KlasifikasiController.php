<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\RandomForestController;
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


    public function getData()
    {
        $randomforest = new RandomForestController();
      return $randomforest->getData();
    }
}
