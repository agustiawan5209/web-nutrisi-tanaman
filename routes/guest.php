<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Guest\DashboardController;


Route::middleware(['auth', 'verified', 'role:user'])->group(function () {
    Route::group(['prefix' => 'user', 'as' => 'guest.'], function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    });
});
