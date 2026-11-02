<?php
// Loaded by one require statement at the bottom of routes/web.php.
// The / route will replace the default Laravel welcome page for this site.

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use App\Http\Middleware\PortfolioInertia;
use Illuminate\Support\Facades\Route;

Route::middleware(PortfolioInertia::class)->group(function (): void {
    Route::get('/', [PortfolioController::class, 'index'])->name('portfolio');
    Route::resource('projects', ProjectController::class)->except(['show']);
});
