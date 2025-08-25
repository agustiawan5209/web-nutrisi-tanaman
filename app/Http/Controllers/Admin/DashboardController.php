<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Label;
use App\Models\Gejala;
use App\Models\Dataset;
use App\Models\Kriteria;
use App\Models\JenisTanaman;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\RiwayatKlasifikasi;

class DashboardController extends Controller
{
    public function index()
    {
        // dd(Label::all());
        $label = Label::select('nama')->orderBy('id', 'asc')->get()->pluck('nama')->toArray();

        $data = $this->getData();
        $training = collect($data['training']);
        $kriteria = $data['kriteria'];
        return Inertia::render("dashboard", [
            "jenisTanaman" => JenisTanaman::all()->count(),
            "kriteria" => Kriteria::all()->count(),
            "dataset" => Dataset::all()->count(),
            "riwayat" => RiwayatKlasifikasi::all()->count(),
        ]);
    }

    private function getData()
    {
        // Logic to retrieve data for the Random Forest model

        $data = [];
        $dataset = Dataset::with(['detail', 'detail.kriteria'])->orderBy('id', 'desc')->get();
        $kriteria = Kriteria::select('nama')->orderBy('id', 'asc')->get()->pluck('nama')->toArray();
        $gejala = ["daun menguning" => 1, "pertumbuhan lambat" => 2, "ujung daun mengering" => 3, "daun sehat" => 4, "batang rapuh" => 5, "daun menggulung" => 6];
        foreach ($dataset as $row) {
            $attribut = [];
            foreach ($row->detail as $key => $detail) {
                if ($key === 3 || $detail->kriteria_id == 4 || $detail->kriteria->nama === "gejala") {
                    $gejala = Gejala::where('nama', 'like', '%' . $detail->nilai . '%')->first();
                    if ($gejala) {
                        $attribut[$detail->kriteria->nama] = $gejala->id;
                    } else {
                        $attribut[$detail->kriteria->nama] = 0;
                    }
                } else {
                    $attribut[$detail->kriteria->nama] = intval($detail->nilai);
                }
            }
            $data[] = array_merge($attribut, [
                'jenis_tanaman' => JenisTanaman::where('nama', $row->jenis_tanaman)->first()->id,
                'label' => $row->label,
            ]);
        }
        // dd($data);
        return [
            'training' => $data,
            'kriteria' => array_merge($kriteria, ["jenis_tanaman", 'label']),
        ];
    }
}
