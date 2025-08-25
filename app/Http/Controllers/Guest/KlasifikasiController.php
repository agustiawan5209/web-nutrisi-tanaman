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


    public function getData()
    {
        $data = [];
        $transactionY = [];

        // Ambil dataset dengan detail dan kriteria
        $dataset = Dataset::with(['detail', 'detail.kriteria'])
            ->orderBy('id', 'desc')
            ->get();

        // Ambil kriteria untuk training
        $kriteria_X = Kriteria::select('nama')
            ->where(function ($query) {
                $query->where('nama', 'LIKE', '%gejala%')
                    ->orWhere('nama', 'LIKE', '%umur%')
                    ->orWhere('nama', 'LIKE', '%luas lahan%')
                    ->orWhere('nama', 'LIKE', '%jenis%');
            })
            ->orderBy('id', 'asc')
            ->pluck('nama')
            ->toArray();

        // Ambil semua gejala sekali, buat mapping [nama => id]
        $gejalaMap = Gejala::pluck('id', 'nama')->toArray();

        // Daftar kriteria khusus
        $specialKriteria = ['gejala', 'umur panen', 'luas lahan(m²)'];

        // Mapping nama kriteria → alias
        $aliasMap = [
            'ph air' => 'ph',
            'part per million (ppm)' => 'ppm',
            'ketinggian air' => 'ketinggianAir',
        ];

        foreach ($dataset as $row) {
            $attribut = [];
            $attributY = [];
            foreach ($row->detail as $key => $detail) {
                $namaKriteria = strtolower($detail->kriteria->nama);

                if (in_array($detail->kriteria->nama, $specialKriteria, true)) {
                    // Khusus gejala atau umur panen atau luas lahan
                    if ($key === 3 || $detail->kriteria_id == 4 || $namaKriteria === "gejala") {
                        $gejalaId = $gejalaMap[$detail->nilai] ?? 0;
                        $attribut[$key] = $gejalaId;
                    } else {
                        $attribut[$key] = (int) $detail->nilai;
                    }
                } else {
                    // Gunakan alias jika ada
                    $name = $aliasMap[$namaKriteria] ?? $namaKriteria;
                    $attributY[$name] = (int) $detail->nilai;
                }
            }
            $transactionY[] = $attributY;
            $data[] = array_merge($attribut, [
                JenisTanaman::where('nama', $row->jenis_tanaman)->first()->id,
            ]);
        }
        // dd($data);
        return [
            'training' => array_values($data),
            'kriteria' => $kriteria_X,
            'transactionY' => $transactionY,
        ];
    }
}
