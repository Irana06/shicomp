<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectStatusController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

// Throttled so project codes cannot be guessed by brute force.
Route::get('cek-status', ProjectStatusController::class)
    ->middleware('throttle:30,1')
    ->name('project-status');

require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
