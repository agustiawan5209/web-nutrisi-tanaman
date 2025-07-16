<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DatasetController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\JenisTanamanController;
use App\Http\Controllers\RandomForestController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');



    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {

        // Routes for Kriteria
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

        // Route for jenis Tanaman
        Route::group(['prefix' => 'jenis-tanaman', 'as' => 'jenisTanaman.'], function () {
            Route::controller(JenisTanamanController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::post('/', 'store')->name('store');
                Route::get('/{jenisTanaman}/edit', 'edit')->name('edit');
                Route::put('/{jenisTanaman}', 'update')->name('update');
                Route::delete('/{jenisTanaman}', 'destroy')->name('destroy');
            });
        });
        // Route for training dataset
        Route::group(['prefix' => 'dataset', 'as' => 'dataset.'], function () {
            Route::controller(DatasetController::class)->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::post('/', 'store')->name('store');
                Route::get('/{dataset}/edit', 'edit')->name('edit');
                Route::get('/{dataset}/show', 'show')->name('show');
                Route::put('/{dataset}', 'update')->name('update');
                Route::delete('/{dataset}', 'destroy')->name('destroy');
            });
        });
    });
    // Route for random forest model
    Route::group(['prefix' => 'random-forest', 'as' => 'randomForest.'], function () {
        Route::controller(RandomForestController::class)->group(function () {
            Route::get('/', 'index')->name('index');
        });
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
