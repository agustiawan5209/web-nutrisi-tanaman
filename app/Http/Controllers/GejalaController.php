<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Gejala;
use Illuminate\Support\Facades\App;
use App\Http\Requests\StoreGejalaRequest;
use App\Http\Requests\UpdateGejalaRequest;
use Illuminate\Http\Request;

class GejalaController extends Controller
{
    private const BASE_BREADCRUMB = [
        [
            'title' => 'dashboard',
            'href' => '/dashboard',
        ],
        [
            'title' => 'gejala',
            'href' => '/admin/gejala/',
        ],
    ];
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render("admin/gejala/index", [
            'gejala' => Gejala::all(),
            'breadcrumb' => self::BASE_BREADCRUMB,
            'titlePage'=> 'Gejala',
        ]);
    }
 private function applyFilters($query, Request $request): void
    {
        if ($request->filled('q')) {
            $query->searchByName($request->input('q'));
        }
        if ($request->filled('category')) {
            $query->searchByCategory($request->input('category'));
        }

        if (in_array($request->input('order_by'), ['asc', 'desc'])) {
            $query->orderBy('created_at', $request->input('order_by'));
        } elseif (in_array($request->input('order_by'), ['A-Z', 'Z-A'])) {
            $direction = $request->input('order_by') === 'A-Z' ? 'asc' : 'desc';
            $query->orderBy('name', $direction);
        }

        $sortField = $request->input('sort', 'created_at');
        $sortDirection = $request->input('direction', 'desc');
        $query->orderBy($sortField, $sortDirection);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/gejala/create', [
            'breadcrumb' => array_merge(self::BASE_BREADCRUMB, [
                [
                    'title' => 'tambah kategori',
                    'href' => '/admin/kategori/create',
                ]
            ]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGejalaRequest $request): \Illuminate\Http\RedirectResponse
    {
        $databaseHelper = App::make('databaseHelper');
        return $databaseHelper(
            operation: fn() => Gejala::create([
                'nama' => $request->nama,
                'deskripsi' => $request->deskripsi,
            ]),
            successMessage: 'Kategori Berhasil Ditambahkan!',
            redirectRoute: 'admin.gejala.index'
        );
    }


    /**
     * Display the specified resource.
     */
    public function show(Gejala $gejala)
    {
        return Inertia::render('admin/gejala/show', [
            'breadcrumb' => array_merge(self::BASE_BREADCRUMB, [
                [
                    'title' => 'detail kategori',
                    'href' => '/admin/kategori/detail',
                ]
            ]),
            'gejala' => $gejala,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gejala $gejala)
    {
        return Inertia::render('admin/gejala/edit', [
            'breadcrumb' => array_merge(self::BASE_BREADCRUMB, [
                [
                    'title' => 'edit kategori',
                    'href' => '/admin/kategori/edit',
                ]
            ]),
            'gejala' => $gejala
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGejalaRequest $request, Gejala $gejala)
    {
        $databaseHelper = App::make('databaseHelper');
        return $databaseHelper(
            operation: fn() => $gejala->update([
                'nama'=> $request->nama,
                'deskripsi'=> $request->deskripsi,
            ]),
            successMessage: 'Kategori Berhasil Di Update!',
            redirectRoute: 'admin.gejala.index'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gejala $gejala)
    {
        $databaseHelper = App::make('databaseHelper');
        return $databaseHelper(
            operation: fn() => $gejala->delete(),
            successMessage: 'Kategori Berhasil Di Hapus!',
            redirectRoute: 'admin.gejala.index'
        );
    }
}
