<?php

namespace App\Http\Controllers\Guest;

use Inertia\Inertia;
use App\Models\Label;
use App\Models\Kriteria;
use App\Models\JenisTanaman;
use App\Models\RiwayatKlasifikasi;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreRiwayatKlasifikasiRequest;
use App\Http\Requests\UpdateRiwayatKlasifikasiRequest;

class RiwayatKlasifikasiController extends Controller
{

    private const BASE_BREADCRUMB = [
        [
            'title' => 'dashboard',
            'href' => '/dashboard',
        ],
        [
            'title' => 'riwayat-klasifikasi',
            'href' => '/guest/riwayat-klasifikasi/',
        ],
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Handle the request to display the Random Forest model index page
        $data = RiwayatKlasifikasi::where('user_id', '=', Auth::user()->id)->orderBy('created_at', 'desc')->paginate(10);
        //   dd($data);
        return Inertia::render('guest/riwayat/index', [
            'riwayat' => $data,
            "kriteria" => Kriteria::all(),
            "jenisTanaman" => JenisTanaman::all(),
            "opsiLabel" => Label::all(),
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRiwayatKlasifikasiRequest $request)
    {
        $klasifikasi = RiwayatKlasifikasi::create([
            'user_id' => $request->user_id,
            'user' => json_encode($request->user),
            'label' => $request->label,
            'jenis_tanaman' => $request->jenis_tanaman,
            'attribut' => json_encode($request->attribut),
            'kriteria' => json_encode($request->kriteria),
        ]);
        return response()->json([
            "success" => true,
            "data" => $klasifikasi,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(RiwayatKlasifikasi $riwayat)
    {
        return Inertia::render('guest/riwayat/show', [
            'riwayat' => $riwayat,
            "kriteria" => Kriteria::all(),
            "jenisTanaman" => JenisTanaman::all(),
            "opsiLabel" => Label::all(),
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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RiwayatKlasifikasi $riwayatKlasifikasi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRiwayatKlasifikasiRequest $request, RiwayatKlasifikasi $riwayatKlasifikasi) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RiwayatKlasifikasi $riwayatKlasifikasi)
    {
        $databaseHelper = App::make('databaseHelper');
        return $databaseHelper(
            operation: fn() => $riwayatKlasifikasi->delete(),
            successMessage: 'Kategori Berhasil Di Hapus!',
            redirectRoute: 'guest.klasifikasi.index'
        );
    }
}
