<?php
// This file is already required from routes/web.php by the original integration.
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\PortfolioLoginController;
use App\Http\Controllers\ProjectController;
use App\Http\Middleware\EnsurePortfolioEditor;
use App\Http\Middleware\PortfolioInertia;
use Illuminate\Support\Facades\Route;

Route::middleware(PortfolioInertia::class)->group(function (): void {
    // Everyone may view the portfolio and its published projects.
    Route::get('/', [PortfolioController::class, 'index'])->name('portfolio');

    // A separate login route avoids conflicts with a pre-existing /login page.
    Route::get('/team/login', [PortfolioLoginController::class, 'show'])->name('portfolio.login');
    Route::post('/team/login', [PortfolioLoginController::class, 'store'])->name('portfolio.login.submit');

    // Authentication and an exact email allowlist are enforced on the SERVER.
    Route::middleware(EnsurePortfolioEditor::class)->group(function (): void {
        Route::post('/team/logout', [PortfolioLoginController::class, 'destroy'])->name('portfolio.logout');
        Route::resource('projects', ProjectController::class)->except(['show']);
    });
});
