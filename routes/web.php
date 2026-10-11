<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectStatusController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

// Throttled so project codes cannot be guessed by brute force.
Route::get('cek-status', ProjectStatusController::class)
    ->middleware('throttle:30,1')
    ->name('project-status');

// Built per request so the URLs follow APP_URL on whichever domain the site runs.
Route::get('sitemap.xml', function () {
    $urls = [route('home'), route('project-status')];

    return response()
        ->view('sitemap', ['urls' => $urls])
        ->header('Content-Type', 'application/xml');
})->name('sitemap');

Route::get('robots.txt', fn () => response("User-agent: *\nDisallow: /admin\nDisallow: /settings\n\nSitemap: ".route('sitemap')."\n")
    ->header('Content-Type', 'text/plain'))->name('robots');

require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
