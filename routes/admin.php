<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ProjectStatusUpdateController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('admin', DashboardController::class)->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('categories', ProductCategoryController::class)->except('show');
        Route::resource('products', ProductController::class)->except('show');
        Route::resource('projects', ProjectController::class);
        Route::post('projects/{project}/status', ProjectStatusUpdateController::class)->name('projects.status');
    });
});
