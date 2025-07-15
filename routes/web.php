<?php

use App\Http\Controllers\KriteriaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');



    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::group(['prefix' => 'kriterias', 'as' => 'kriteria.'], function () {
            Route::controller(KriteriaController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::post('/', 'store')->name('store');
                Route::get('/{kriteria}/edit', 'edit')->name('edit');
                Route::put('/{kriteria}', 'update')->name('update');
                Route::delete('/{kriteria}', 'destroy')->name('destroy');
            });
        });
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
