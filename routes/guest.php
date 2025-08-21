<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Guest\DashboardController;
use App\Http\Controllers\Guest\KlasifikasiController;
use App\Http\Controllers\Guest\RiwayatKlasifikasiController;

Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::group(['prefix' => 'user', 'as' => 'guest.'], function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


        Route::group(['prefix' => 'klasifikasi', 'as' => 'klasifikasi.'], function () {
            Route::controller(KlasifikasiController::class)->group(function () {
                Route::get('/', 'index')->name('index');
            });
        });


         Route::group(['prefix' => 'riwayat', 'as' => 'riwayat.'], function () {
            Route::controller(RiwayatKlasifikasiController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/{riwayat}/show', 'show')->name('show');
            });
        });
    });
});

Route::post('riwayat-klasifikasi/store-data', [RiwayatKlasifikasiController::class, 'store'])->name('riwayat-klasifikasi.store');

// Route for random forest model
